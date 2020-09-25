import { CreateAppointment, ListAppointments, CreateDTO, AppointmentsModel } from './service.model'
import Create, { CreateAppointmentDependencies } from './Create';
import List, { ListAppointmentDependencies } from './List';


interface AppointmentsService extends CreateAppointment, ListAppointments {}

export interface AppointmentsServiceDependencies {
    create: CreateAppointmentDependencies
    list: ListAppointmentDependencies
}

// export default class extends Create, List implements AppointmentsService {
//     constructor(dependencies: AppointmentsServiceDependencies) {
//         super(dependencies.create);
//         super(dependencies.list);
//     }
// }

export default class implements AppointmentsService {
    async create(dto: CreateDTO): Promise<AppointmentsModel> {
        return await new Create().create(dto)
    }
    async list(): Promise<AppointmentsModel[]> {
        return await new List().list()
    }
}