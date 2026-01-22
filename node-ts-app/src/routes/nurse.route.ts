import express, { Router } from 'express';
import { NurseController } from '../controller/nurse.controller';

const nurseRouter: Router = express.Router();

// Get all nurses
nurseRouter.get('/', NurseController.getAllNurses);

// Get nurse by ID
nurseRouter.get('/:id', NurseController.getNurseById);

// Create a new nurse
nurseRouter.post('/', NurseController.createNurse);

// Update nurse
nurseRouter.put('/:id', NurseController.updateNurse);

// Delete nurse
nurseRouter.delete('/:id', NurseController.deleteNurse);

export default nurseRouter;
