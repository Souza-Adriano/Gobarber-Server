import { CreateUser, ListUsers, CreateDTO, UserModel } from './service.model'
import Create from './Create';
import List from './List';


interface UsersService extends CreateUser, ListUsers {}


export default class implements UsersService {
    async create(dto: CreateDTO): Promise<UserModel> {
        return await new Create().create(dto)
    }
    async list(): Promise<UserModel[]> {
        return await new List().list()
    }
}