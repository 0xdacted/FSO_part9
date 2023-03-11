"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, gender, occupation, dateOfBirth }) => ({
        id,
        name,
        gender,
        occupation,
        dateOfBirth,
    }));
};
const addPatient = (patient) => {
    const addedPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    patients_1.default.push(addedPatient);
    return addedPatient;
};
exports.default = {
    getNonSensitivePatients,
    addPatient
};
