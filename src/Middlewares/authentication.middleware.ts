import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import sessionConfig from '../Config/Session.config'
import { SessionInfo, Token } from '../Services/Sessions/service.model'
import UsersRepository from '../Repositories/Users.repository'
import { getCustomRepository } from 'typeorm';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { secret } = sessionConfig
        const repository = getCustomRepository(UsersRepository)
        if(!request.headers.authorization) { throw new Error('Missing authorization token') }

        const authorization = request.headers.authorization
        const [ prefix, token ] = authorization.split(' ');

        if(prefix !== 'Bearer') { throw new Error('Invalid token') }
        if(!token) { throw new Error('Invalid token') }

        const {exp, iat, sub} = verify(token, secret) as Token;
        const user = await repository.findOne({where: {id: sub }})
        if(!user) { throw new Error('Fail on authenticate user') }

        request.session = {
            ...user,
            iat: new Date(iat),
            exp: new Date(exp),
        }

        next();
    } catch (error) {
        response.status(401).json({
            message: error.message || 'Internal Server Error'
        })
    }
}