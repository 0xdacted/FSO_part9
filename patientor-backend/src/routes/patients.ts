import express from 'express';

import patientsService from '../services/patientsService';
import toNewPatient from '../utils'

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

export default patientsRouter;