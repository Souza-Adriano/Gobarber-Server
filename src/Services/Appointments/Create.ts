import serviceUtil, { ServiceUtils } from '../service.util';
import AppointmentRepository from '../../Repositories/Appointments.repository'
import { CreateAppointment, CreateDTO as DTO } from './service.model'
import { getCustomRepository } from 'typeorm'

export interface CreateAppointmentDependencies {
    repository: {
        appointments: AppointmentRepository
    },

    utils: ServiceUtils
}

export default class implements CreateAppointment{
    protected utils = new serviceUtil()

    protected get repository() {
        return getCustomRepository(AppointmentRepository)
    }

    protected get parseISO() {
        return this.utils.date.parseISO
    }

    protected get startOfHour() {
        return this.utils.date.startOfHour
    }

    protected parseDate(date: string) {
        return this.startOfHour(this.parseISO(date));
    }

    protected rule = {
        onlyHaveOnePerHour: async (date: Date): Promise<void> => {
            const dataset = await this.repository.findByDate(date);
            if(dataset !== null) { throw new Error('The time has already been booked')}
        }
    }

    public async create(dto: DTO) {
        const date = this.parseDate(dto.date)
        await this.rule.onlyHaveOnePerHour(date)

        const appointment = this.repository.create({provider: dto.provider, date});
        await this.repository.save(appointment);

        return appointment;
    }
}