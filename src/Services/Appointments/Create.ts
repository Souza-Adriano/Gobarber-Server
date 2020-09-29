import ServiceUtil, { ServiceUtils } from '../service.util';
import AppointmentRepository from '../../Repositories/Appointments.repository'
import { CreateAppointment, CreateDTO as DTO } from './service.model'
import { getCustomRepository } from 'typeorm'

export default class implements CreateAppointment{
    protected utils: ServiceUtils = new ServiceUtil()

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
        validateBody: async(dto: Partial<DTO>) => {
            if(!dto.provider_id) { throw new Error(`The provider_id field is required`) }
            if(!dto.date) { throw new Error(`The date field is required`) }
        },

        onlyHaveOnePerHour: async (date: Date): Promise<void> => {
            const dataset = await this.repository.findByDate(date);
            if(dataset !== null) { throw new Error('The time has already been booked')}
        }
    }

    private async executeCreateRules(dto: DTO, date: Date): Promise<void> {
        await Promise.all([
            this.rule.validateBody(dto),
            this.rule.onlyHaveOnePerHour(date)
        ])
    }

    public async create(dto: DTO) {
        const date = this.parseDate(dto.date)
        await this.executeCreateRules(dto, date)

        const appointment = this.repository.create({provider_id: dto.provider_id, date});
        await this.repository.save(appointment);
        console.log('dto:appointment', dto)
        console.log('new:appointment', appointment)
        return appointment;
    }
}