import express, { Application, Router } from 'express';
import { Middleware, Route, HttpMethod, Handler, Loader } from './Utils'

export interface Server {
    start(): Promise<void>
}

export interface ServerConfig {
    port: number;
    middlewares: Middleware[];
    routes: Route[],
}

export { Middleware, Route, HttpMethod, Handler }
export default class HttpServer implements Server {
    private app: Application;
    private loaders: Loader[] = [];
    
    constructor(private readonly config: ServerConfig) {
        this.app = express();
    }

    protected get port(): number {
        return this.config.port
    }

    private middlewares(middlewares: any[]) {
        middlewares.forEach((middleware) => this.app.use(middleware));
    }

    private log(message: string, title?: string) {
        title ? console.log(title, message) : console.log(message);
    }

    private routes(routes: Route[]) {
        const router = Router();
        this.log(`${routes.length} routes founded`, 'Loading Routes:')
        for(const routeIndex in routes) {
            const route = routes[routeIndex]
            this.log(`${route.handlers.length} handlers founded`, `\nroot: ${route.root}\n`)
            route.handlers.forEach(handler => {
                this.log(`${handler.uri}`, ` @${handler.method}`)
                switch(handler.method) {
                    case 'GET': {
                        return router.get(`${route.root}${handler.uri}`, ...handler.middlewares, handler.handler);
                    }
    
                    case 'POST': {
                        return router.post(`${route.root}${handler.uri}`, ...handler.middlewares, handler.handler);
                    }
    
                    case 'PUT': {
                        return router.put(`${route.root}${handler.uri}`, ...handler.middlewares, handler.handler);
                    }
    
                    case 'PATCH': {
                        return router.patch(`${route.root}${handler.uri}`, ...handler.middlewares, handler.handler);
                    }
    
                    case 'DELETE': {
                        return router.delete(`${route.root}${handler.uri}`, ...handler.middlewares, handler.handler);
                    }
                }
            })

            this.app.use(router);
        }
    }

    private async loading(loaders: Loader[]) {
        this.log(`loading ${loaders.length} loaders`, `Before Start`)
        for (const index in loaders) {
            const loader = loaders[index];
            this.log(`[ ${index + 1} / ${loaders.length + 1}]`, `loading ${loader.name}`)
            try { await loader.loader();}
            catch (error) {
                this.log(`FAIL\n`, `${loader.name}:`)
                throw new Error(`Error on load ${loader.name}`)
            }
            this.log(`OK`, `${loader.name}:`)
        }
    }

    public load(loader: Loader): this {
        this.loaders.push(loader)
        return this;
    }

    public async start() {
        console.clear()
        await this.loading(this.loaders)
            .then(() => console.log())
        this.middlewares(this.config.middlewares);
        this.routes(this.config.routes);

        this.app.listen(this.config.port, () => {
            console.log(`\nServer Started\nhttp://localhost:${this.config.port}/`)
        })
    }
}