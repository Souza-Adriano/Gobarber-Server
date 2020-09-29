import UsersRepository from '../../Repositories/Users.repository'
import { CreateSession, CreateDTO as DTO, Session } from './service.model'
import { getCustomRepository } from 'typeorm'
import Crypto from '../../Core/Crypto'
import { sign } from 'jsonwebtoken'

export default class implements CreateSession {
    private secret: string = '8b0088f80a3d1e459fcf12a98d122e15'

    protected crypt = new Crypto();

    protected get repository() {
        return getCustomRepository(UsersRepository)
    }

    protected rule = {
        isPasswordMatch: async (hash: string, password: string) => {
            if(!await this.crypt.validate(password, hash)) {
                throw new Error('Invalid email/password')
            }
        }
    }

    private async findUser(email: string) {
        const user = await this.repository.findOne({where: { email }})
        if(!user) { throw new Error('Invalid user / password') }

        return user;
    }
    
    private async generateToken(id: string) {
        return sign({}, this.secret, {
            subject: id,
            expiresIn: '1d',
        })
    }

    public async create(dto: DTO): Promise<Session> {
        const { name, email, id, password } = await this.findUser(dto.email);
        
        await this.rule.isPasswordMatch(password, dto.password);
        const token = await this.generateToken(id);

        return { name, token }
    }
}