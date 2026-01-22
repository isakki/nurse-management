import express, { Request, Response, NextFunction } from 'express';
import { createApiResponse } from "../helper/api-response.helper";
import { ApiException, handleException } from '../error/api-exception';
import { NurseService } from "../service/nurse.service";

// Get all nurses
async function getAllNurses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const nurses = await NurseService.getAllNurses();
        res.status(200).send(createApiResponse({ nurses }, "Nurses retrieved successfully"));
    } catch (e) {
        handleException(e, next);
    }
}

// Get nurse by ID
async function getNurseById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApiException(400, 'Nurse ID is required');
        }
        const nurse = await NurseService.getNurseById(parseInt(id));
        if (!nurse) {
            throw new ApiException(404, 'Nurse not found');
        }
        res.status(200).send(createApiResponse({ nurse }, "Nurse retrieved successfully"));
    } catch (e) {
        handleException(e, next);
    }
}

// Create a new nurse
async function createNurse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { name, licenseNumber, dob, age } = req.body;
        
        // Validation
        if (!name || !licenseNumber || !dob || age === undefined) {
            throw new ApiException(400, 'All fields (name, licenseNumber, dob, age) are required');
        }

        const nurse = await NurseService.createNurse({
            name,
            licenseNumber,
            dob: new Date(dob),
            age: parseInt(age)
        });

        res.status(201).send(createApiResponse({ nurse }, "Nurse created successfully"));
    } catch (e) {
        handleException(e, next);
    }
}

// Update nurse
async function updateNurse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        const { name, licenseNumber, dob, age } = req.body;

        if (!id) {
            throw new ApiException(400, 'Nurse ID is required');
        }

        const nurseData: any = {};
        if (name) nurseData.name = name;
        if (licenseNumber) nurseData.licenseNumber = licenseNumber;
        if (dob) nurseData.dob = new Date(dob);
        if (age !== undefined) nurseData.age = parseInt(age);

        const updatedNurse = await NurseService.updateNurse(parseInt(id), nurseData);
        
        if (!updatedNurse) {
            throw new ApiException(404, 'Nurse not found');
        }

        res.status(200).send(createApiResponse({ updatedNurse }, "Nurse updated successfully"));
    } catch (e) {
        handleException(e, next);
    }
}

// Delete nurse
async function deleteNurse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiException(400, 'Nurse ID is required');
        }

        const isDeleted = await NurseService.deleteNurse(parseInt(id));

        if (!isDeleted) {
            throw new ApiException(404, 'Nurse not found');
        }

        res.status(200).send(createApiResponse({}, "Nurse deleted successfully"));
    } catch (e) {
        handleException(e, next);
    }
}

export const NurseController = {
    getAllNurses,
    getNurseById,
    createNurse,
    updateNurse,
    deleteNurse
};
