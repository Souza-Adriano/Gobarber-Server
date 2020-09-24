import HttpServer from './Core/Server';
import middlewares from './Middlewares/Global';
import routes from './Routes';
import Database from  './Loaders/Database.loader';

declare global {
    type Constructor<T extends {} = {}> = new (...args: any[]) => T;
}

const App = new HttpServer({
    port: 4000,
    routes,
    middlewares
})

App.load(Database)
    .start()
    .catch(console.error);