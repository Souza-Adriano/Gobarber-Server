import Repository, { Create, List, PageCounter, FindBy } from './Repository.model';
import AppointmentModel, { Appointment, AppointmentModelDependency } from '../Models/Appointments.model'

export { Appointment }

export type CreateAppointment = Pick<Appointment, 'provider' | 'date' >

export interface AppointmentRepositoryDependencies extends AppointmentModelDependency {}

const list: Appointment[] = [] // Refatorar
export default class AppointmentRepository extends Repository implements Create<CreateAppointment, string>, List<Appointment>, FindBy<Appointment, Partial<Appointment>> {
    private db: Appointment[] = list; // Refatorar
    constructor(private dependencies: AppointmentRepositoryDependencies) {
        super('Appointments');
        console.log('Appointments:instance', 'created')
    }

    protected rules = {
        onlyOnePerMoment: async (date: Date): Promise<void> => {
            const result = await this.findBy({ date })
                .then((list) => list.length === 0)
            console.log('onlyOnePerMoment', result)
            if(result === false) { throw new Error('only can exists one appointment per hour') }
        }
    }

    public async list(offset?: PageCounter): Promise<Appointment[]> {
        if(offset) { return this.db }
        else { return this.db }
    }

    public async create(dto: CreateAppointment) {
        const register: Appointment = new AppointmentModel(dto, this.dependencies);
        await this.rules.onlyOnePerMoment(register.date);

        this.db.push({...register});

        return register.id;
    }

    public async findBy(dto: Partial<Appointment>) {
        // Refatorar este codigo e remover os ifs
        return this.db.filter((item) => {
            if(dto.date) { return item.date.toString() === item.date.toString() }
            if(dto.id) { return item.id === dto.id }
            if(dto.provider) { return item.provider === dto.provider }
        });
    }
}