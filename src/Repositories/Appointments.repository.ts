import Appointments from '../Models/Appointments.model'
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointments)
export default class AppointmentRepository extends Repository<Appointments>{
    public async findByDate(date: Date): Promise<Appointments | null> {
        const dataset = await this.findOne({
            where: { date }
        });

        return dataset || null;
    }
}