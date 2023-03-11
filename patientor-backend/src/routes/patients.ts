import express from 'express';

import patientsService from '../services/patientsService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.post('/', (req, res) => {
  const { name, ssn, gender, occupation } = req.body;

  const addedPatient = patientsService.addPatient(
    name,
    ssn,
    gender,
    occupation,
  );
  res.json(addedPatient);
});

export default patientsRouter;