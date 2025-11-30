import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import * as VacancyController from '../controllers/vacancy.controller.js';
import * as AppController from '../controllers/application.controller.js';

const router = Router();

//  Vacancy Routes
router.get('/vacancies', VacancyController.getVacancies);
router.get('/vacancies/:id', VacancyController.getVacancyById);
router.post('/vacancies', VacancyController.createVacancy);
router.delete('/vacancies/:id', VacancyController.deleteVacancy);
router.post('/seed', VacancyController.seedVacancies);

//  Application Routes
router.get('/applications', AppController.getApplications);
// upload middleware applied here
router.post('/apply', upload.single('resume'), AppController.submitApplication);

export default router;