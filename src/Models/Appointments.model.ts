import { Generator } from '../Core/Utils/generator.util'

export interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

export interface AppointmentModelDependency {
    generator: Constructor<Generator>,
}

export default class AppointmentModel implements Appointment {
    public readonly id: string
    public readonly provider: string
    public readonly date: Date

    constructor(dto: Pick<Appointment, 'date' | 'provider'>, dependencies: AppointmentModelDependency) {
        this.id = new dependencies.generator().uid();
        this.provider = dto.provider,
        this.date = dto.date
    }
}