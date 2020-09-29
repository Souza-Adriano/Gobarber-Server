import AppointmentRepository from '../../Repositories/Appointments.repository'
import { ListAppointments } from './service.model'
import { getCustomRepository } from 'typeorm'

export interface ListAppointmentDependencies {
    repository: {
        appointments: AppointmentRepository
    }
}

export default class implements ListAppointments {

    protected get repository() {
        return getCustomRepository(AppointmentRepository)
    }

    public async list() {
        const appointments = await this.repository.find();
        return appointments;
    }
}