import UsersRepository from '../../Repositories/Users.repository';
import { CreateUser, CreateDTO as DTO, UserModel, PasswordConfirmation } from './service.model';
import { getCustomRepository } from 'typeorm';
import Crypto, { Cryptography } from '../../Core/Crypto';

export default class implements CreateUser {
    protected crypto: Cryptography = new Crypto();

    protected get repository() {
        return getCustomRepository(UsersRepository)
    }

    protected readonly rule = {
        validateBody: async(dto: Partial<DTO>) => {
            if(!dto.name) { throw new Error(`The name field is required`) }
            if(!dto.email) { throw new Error(`The email field is required`) }
            if(!dto.password) { throw new Error(`The password field is required`) }
            if(!dto.confirmPassword) { throw new Error(`The confirmPassword field is required`) }
        },

        checkIfUnregisteredEmail: async (email: string): Promise<void> => {
            const result = await this.repository.findOne({ email });
            if(result) { throw new Error(`E-mail ${email} already registered`) };
        },

        checkIfPasswordAndConfirmationMatch: async ({password, confirmPassword}: PasswordConfirmation): void => {
            if(password !== confirmPassword) { throw new Error('password does not match password confirmation') }
        },

        checkIfIsAValidEmail: async (email: string) => {
            const testMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!testMail.test(email)) { throw new Error(`Email ${email} is invalid`) }
        }
    }

    private async executeCreateRules(dto: DTO): Promise<void> {
        await Promise.all([
            this.rule.validateBody(dto),
            this.rule.checkIfIsAValidEmail(dto.email),
            this.rule.checkIfUnregisteredEmail(dto.email),
            this.rule.checkIfPasswordAndConfirmationMatch(dto),
        ])
    }

    protected async encriptPassword(password: string): Promise<string> {
        return await this.crypto.hash(password);
    }

    public async create(dto: DTO): Promise<UserModel> {
        await this.executeCreateRules(dto);

        const user = this.repository.create({
            name: dto.name,
            email: dto.email,
            password: await this.encriptPassword(dto.confirmPassword),
        });

        await this.repository.save(user);

        return user;
    }
}