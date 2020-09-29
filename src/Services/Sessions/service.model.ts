import { User } from '../../Models/Users.model'

export interface CreateDTO {
    email: string;
    password: string;
}

export interface Session {
    name: string;
    token: string
}

export interface SessionInfo extends User {
    iat: Date,
    exp: Date,
}

export interface Token {
    sub: string;
    iat: number;
    exp: number;
}

export interface CreateSession {
    create(dto: CreateDTO): Promise<Session>
}