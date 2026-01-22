import { Repository } from 'typeorm';
import getDataSource from '../config/db-config';
import { Nurse } from '../model/entities/nurse.entity';

export class NurseService {
    private static nurseRepository: Repository<Nurse> | null = null;

    private static async getNurseRepository(): Promise<Repository<Nurse>> {
        if (!this.nurseRepository) {
            const dataSource = await getDataSource();
            this.nurseRepository = dataSource.getRepository(Nurse);
        }
        return this.nurseRepository;
    }

    // Get all nurses
    static async getAllNurses(): Promise<Nurse[]> {
        try {
            const repository = await this.getNurseRepository();
            return await repository.find({
                order: {
                    createdAt: 'DESC'
                }
            });
        } catch (error) {
            console.error('Error fetching nurses:', error);
            throw error;
        }
    }

    // Get nurse by ID
    static async getNurseById(id: number): Promise<Nurse | null> {
        try {
            const repository = await this.getNurseRepository();
            return await repository.findOne({ where: { id } });
        } catch (error) {
            console.error('Error fetching nurse:', error);
            throw error;
        }
    }

    // Create a new nurse
    static async createNurse(nurseData: Partial<Nurse>): Promise<Nurse> {
        try {
            const repository = await this.getNurseRepository();
            const nurse = repository.create(nurseData);
            return await repository.save(nurse);
        } catch (error) {
            console.error('Error creating nurse:', error);
            throw error;
        }
    }

    // Update nurse
    static async updateNurse(id: number, nurseData: Partial<Nurse>): Promise<Nurse | null> {
        try {
            const repository = await this.getNurseRepository();
            await repository.update(id, nurseData);
            return await this.getNurseById(id);
        } catch (error) {
            console.error('Error updating nurse:', error);
            throw error;
        }
    }

    // Delete nurse
    static async deleteNurse(id: number): Promise<boolean> {
        try {
            const repository = await this.getNurseRepository();
            const result = await repository.delete(id);
            return result.affected !== 0;
        } catch (error) {
            console.error('Error deleting nurse:', error);
            throw error;
        }
    }
}
