import { History } from './Models.model'
import UserModel from './Users.model'
import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

export interface Appointment extends History {
    id: string;
    provider_id: string;
    provider: UserModel;
    date: Date;
}

@Entity('appointments')
export default class AppointmentModel implements Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider_id: string

    @ManyToOne(() => UserModel)
    @JoinColumn({name: 'provider_id'})
    provider: UserModel;

    @Column()
    date: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}