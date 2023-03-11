import express from 'express';
import patientsData from '../../data/patients';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsData)
})

export default patientsRouter;