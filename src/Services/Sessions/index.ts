import { CreateSession, CreateDTO, Session } from './service.model'
import Create from './Create';

interface SessionsService extends CreateSession {}

export default class implements SessionsService {
    async create(dto: CreateDTO): Promise<Session> {
        return await new Create().create(dto)
    }
}