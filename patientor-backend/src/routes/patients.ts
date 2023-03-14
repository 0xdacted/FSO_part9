import express from 'express';
import { Request } from 'express';
import { Entry } from '../types';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';
import { v1 as uuid } from 'uuid';

interface EntryRequest extends Request {
  body: Entry;
}

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.post('/', (req, res) => {
  try {
    const NewPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(NewPatient);
    res.json(addedPatient);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientById(id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send(`Patient with id ${id} not found`);
  }
});

patientsRouter.post('/:id/entries', (req: EntryRequest, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientById(id);
  
  const parseDiagnosisCodes = (object: unknown): Array<string> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [];
    }
  
    return object.diagnosisCodes as Array<string>;
  };
  
  if (patient) {
    const { type, description, date, specialist, diagnosisCodes } = req.body;
    if (!type || !description || !date || !specialist) {
      return res.status(400).send('Missing required field');
    }
    let newEntry;
    switch (type) {
      case 'Hospital':
        const { discharge } = req.body;
        if (!discharge || !discharge.date || !discharge.criteria) {
          return res.status(400).send('Missing required field');
        }
        newEntry = {
          id: uuid(),
          type,
          description,
          date,
          specialist,
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          discharge
        };
        break;
      case 'OccupationalHealthcare':
        const { employerName, sickLeave } = req.body;
        if (!employerName) {
          return res.status(400).send('Missing required field');
        }
        newEntry = {
          id: uuid(),
          type,
          description,
          date,
          specialist,
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          employerName,
          sickLeave
        };
        break;
      case 'HealthCheck':
        const { healthCheckRating } = req.body;
        if (!healthCheckRating && healthCheckRating !== 0) {
          return res.status(400).send('Missing required field');
        }
        newEntry = {
          id: uuid(),
          type,
          description,
          date,
          specialist,
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          healthCheckRating
        };
        break;
      default:
        return res.status(400).send('Invalid entry type');
    }

    patient.entries?.push(newEntry);
    res.json(newEntry);
    return newEntry;
  } else {
    res.status(400).send(`Patient with id ${id} not found`);
    return null;
  }
});
export default patientsRouter;