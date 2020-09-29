import { CreateAppointment, ListAppointments, CreateDTO, AppointmentsModel } from './service.model'
import Create from './Create';
import List from './List';

interface AppointmentsService extends CreateAppointment, ListAppointments {}

export default class implements AppointmentsService {
    async create(dto: CreateDTO): Promise<AppointmentsModel> {
        return await new Create().create(dto)
    }
    async list(): Promise<AppointmentsModel[]> {
        return await new List().list()
    }
}