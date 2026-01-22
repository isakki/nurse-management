import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:7000'}/nurses`;

export interface Nurse {
    id?: number;
    name: string;
    licenseNumber: string;
    dob: string;
    age: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse {
    status: number;
    response: {
        nurses?: Nurse[];
        nurse?: Nurse;
        updatedNurse?: Nurse;
    };
    message: string;
}

// Get all nurses
export const getAllNurses = async (): Promise<Nurse[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${API_BASE_URL}/`);
        return response.data.response.nurses || [];
    } catch (error) {
        console.error('Error fetching nurses:', error);
        throw error;
    }
};

// Get nurse by ID
export const getNurseById = async (id: number): Promise<Nurse> => {
    try {
        const response = await axios.get<ApiResponse>(`${API_BASE_URL}/${id}`);
        if (!response.data.response.nurse) {
            throw new Error('Nurse not found');
        }
        return response.data.response.nurse;
    } catch (error) {
        console.error('Error fetching nurse:', error);
        throw error;
    }
};

// Create a new nurse
export const createNurse = async (nurseData: Nurse): Promise<Nurse> => {
    try {
        const response = await axios.post<ApiResponse>(`${API_BASE_URL}/`, nurseData);
        if (!response.data.response.nurse) {
            throw new Error('Failed to create nurse');
        }
        return response.data.response.nurse;
    } catch (error) {
        console.error('Error creating nurse:', error);
        throw error;
    }
};

// Update nurse
export const updateNurse = async (id: number, nurseData: Partial<Nurse>): Promise<Nurse> => {
    try {
        const response = await axios.put<ApiResponse>(`${API_BASE_URL}/${id}`, nurseData);
        if (!response.data.response.updatedNurse) {
            throw new Error('Failed to update nurse');
        }
        return response.data.response.updatedNurse;
    } catch (error) {
        console.error('Error updating nurse:', error);
        throw error;
    }
};

// Delete nurse
export const deleteNurse = async (id: number): Promise<void> => {
    try {
        await axios.delete<ApiResponse>(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting nurse:', error);
        throw error;
    }
};
