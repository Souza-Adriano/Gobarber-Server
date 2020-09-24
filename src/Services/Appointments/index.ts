import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository, { Appointment, CreateAppointment, AppointmentRepositoryDependencies } from '../../Repositories/Appointments.repository'

interface DTOCreate {
    provider: string;
    date: string;
}

export interface AppointmentsServiceDependencies extends AppointmentRepositoryDependencies {
    repository: Constructor<AppointmentRepository>;
}

export default class AppointmentsService {
    protected repository: AppointmentRepository;

    constructor(private dependencies: AppointmentsServiceDependencies) {
        this.repository = new dependencies.repository(dependencies);
    }

    public async create(dto: DTOCreate) {
        const moment = startOfHour(parseISO(dto.date));
        const result = await this.repository.create({provider: dto.provider, date: moment})
        return { ...dto, id: result };
    }

    public async list() {
        return await this.repository.list();
    }
}