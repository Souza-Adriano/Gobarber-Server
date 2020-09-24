import { Middleware } from '../../Core/Server/Utils';
import cors from 'cors';
import { json, urlencoded } from 'body-parser'

import { Request, Response, NextFunction } from 'express';

const logger = (request: Request, response: Response, next: NextFunction) => {
    console.log(`${request.ip || 'IP Not found'} @${request.method} ${request.path}\n`, request.body)
    next();
}

export default [
    cors(),
    json(),
    urlencoded(),
    logger,
] as Middleware[]