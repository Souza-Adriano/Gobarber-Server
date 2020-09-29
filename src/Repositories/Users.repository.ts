import Users from '../Models/Users.model'
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Users)
export default class UsersRepository extends Repository<Users> {}