import UserModel, { User } from '../../Models/Users.model';

export interface CreateDTO extends Pick<User, 'name' | 'email' | 'password'> {
    confirmPassword: string;
}

export type PasswordConfirmation = Pick<CreateDTO, 'password' | 'confirmPassword'>

export interface CreateUser {
    create(dto: CreateDTO): Promise<UserModel>
}

export interface ListUsers {
    list(): Promise<UserModel[]>
}

export { UserModel }