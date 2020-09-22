import { Request, Response, NextFunction } from 'express';

export type Middleware = (request: Request, response: Response, next: NextFunction) => void | Promise<void>;
export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export interface Handler {
    uri: string;
    middlewares: Middleware[];
    method: HttpMethod;
    handler: (request: Request, response: Response) => Promise<void> | void;
}

export interface Route {
    root: string,
    handlers: Handler[]
}

export interface Loader {
    name: string;
    loader: () => Promise<void> | void;
}