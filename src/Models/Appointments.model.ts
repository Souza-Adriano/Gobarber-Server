import { Generator } from '../Core/Utils/generator.util'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

@Entity('appointments')
export default class AppointmentModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider: string

    @Column()
    date: Date
}