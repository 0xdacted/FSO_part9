import express from 'express';
import { Diagnoses, HealthCheckRating, Entry } from '../types';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';
import { v1 as uuid } from 'uuid';

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

patientsRouter.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientById(id);

  const parseDiagnosisCodes = (object: unknown): Array<Diagnoses> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnoses>;
    }

    return object.diagnosisCodes as Array<Diagnoses>;
  };

  if (patient) {
    const { type, description, date, specialist, diagnosisCodes } = req.body;
    if (!type || !description || !date || !specialist) {
      return res.status(400).send('Missing required field');
    }
    let newEntry: Entry;
    switch (type) {
      case 'Hospital':
        const discharge = req.body.discharge as { date: string, criteria: string };
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
        const sickLeave = req.body.sickLeave as { startDate: string, endDate: string } | undefined;
        if (!req.body.employerName) {
          return res.status(400).send('Missing required field');
        }
        newEntry = {
          id: uuid(),
          type,
          description,
          date,
          specialist,
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          employerName: req.body.employerName,
          sickLeave
        };
        break;
      case 'HealthCheck':
        const healthCheckRating = req.body.healthCheckRating as HealthCheckRating;
        if (healthCheckRating === undefined) {
          return res.status(400).send('Missing required field');
        }
        newEntry = {
          id: uuid(),
          type,
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
  } else {
    res.status(400).send(`Patient with id ${id} not found`);
  }
});
export default patientsRouter;