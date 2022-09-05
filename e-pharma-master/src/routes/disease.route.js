/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/named */
import express from 'express';
import {
  addDiseases,
  viewDiseases,
  viewDiseasesOne,
  deleteDiseases,
  updateDiseases,
  viewDisease,
} from '../controllers/disease/disease.controller';
import {
  diseaseRegisterValidation,
  diseaseUpdateValidation,
} from '../controllers/disease/disease.validator';
import { verifyTokenAuth } from '../middlewares/verifyAuthToken';
import { adminRole, userRole } from '../middlewares/checkRole';
import { checkDisease } from '../middlewares/checkCategory';

const router = express.Router();

// routes for admin
router.post('/diseases/:categoryId', verifyTokenAuth, adminRole, diseaseRegisterValidation, addDiseases);
router.get('/diseases/:categoryId', verifyTokenAuth, adminRole, checkDisease, viewDiseases);
router.get('/disease/:diseasesId', verifyTokenAuth, adminRole, viewDiseasesOne);
router.delete('/diseases/:diseasesId', verifyTokenAuth, adminRole, deleteDiseases);
router.put('/diseases/:diseasesId', verifyTokenAuth, adminRole, diseaseUpdateValidation, updateDiseases);

// routes for user
router.get('/all-disease/:categoryId', verifyTokenAuth, userRole, checkDisease, viewDisease);

module.exports = router;
