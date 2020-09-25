import AppointmentsModel from '../../Models/Appointments.model'

export interface CreateDTO {
    provider: string;
    date: string;
}

export interface CreateAppointment {
    create(dto: CreateDTO): Promise<AppointmentsModel>
}

export interface ListAppointments {
    list(): Promise<AppointmentsModel[]>
}

export { AppointmentsModel }