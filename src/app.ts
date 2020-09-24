import HttpServer from './Core/Server';
import middlewares from './Middlewares/Global';
import routes from './Routes';

declare global {
    type Constructor<T extends {} = {}> = new (...args: any[]) => T;
}

const App = new HttpServer({
    port: 4000,
    routes,
    middlewares
})

App.start()
    .catch(console.error);