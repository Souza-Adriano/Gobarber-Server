import { Middleware } from '../../Server/Utils';
import cors from 'cors';
import { json, urlencoded } from 'body-parser'

export const global: Middleware[] = [
    cors(),
    json(),
    urlencoded(),
]