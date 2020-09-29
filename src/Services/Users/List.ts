import UsersRepository from '../../Repositories/Users.repository'
import { ListUsers } from './service.model'
import { getCustomRepository } from 'typeorm'


export default class implements ListUsers {

    protected get repository() {
        return getCustomRepository(UsersRepository)
    }

    public async list() {
        const appointments = await this.repository.find();
        return appointments;
    }
}