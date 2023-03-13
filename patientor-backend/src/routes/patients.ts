import express from 'express';

import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

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
    res.send(patient);
  } else {
    res.status(404).send(`Patient with id ${id} not found`);
  }
});

export default patientsRouter;