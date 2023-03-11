"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitivePatients());
});
patientsRouter.post('/', (req, res) => {
    const { name, ssn, gender, occupation, dateOfBirth } = req.body;
    const addedPatient = patientsService_1.default.addPatient({
        name,
        ssn,
        gender,
        occupation,
        dateOfBirth
    });
    res.json(addedPatient);
});
exports.default = patientsRouter;
