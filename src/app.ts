import HttpServer from './Server';
import { Middlewares, Routes } from './Config'

const App = new HttpServer({
    port: 4000,
    routes: Routes,
    middlewares: Middlewares,
})

App.start()
    .catch(console.error);