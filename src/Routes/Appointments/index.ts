import { Route,  Handler} from '../../Core/Server';
import AppointmentsHandler from '../../Services/Appointments'
import repository from '../../Repositories/Appointments.repository';
import generator from '../../Core/Utils/generator.util'

const handler = new AppointmentsHandler({generator, repository});

const Create: Handler = {
    uri: '/',
    method: 'POST',
    middlewares: [],
    handler: async (request, response) => {
        try {
            console.log('Create:handler', true)
            const resultset = await handler.create(request.body);

            response.json(resultset)
        } catch (error) {
            console.log(error)
            response.status(400).send(error.message)
        }
    }
}

const List: Handler = {
    uri: '/',
    method: 'GET',
    middlewares: [],
    handler: async (request, response) => {
        const resultset = await handler.list();
        response.json(resultset)
    }
}

const route: Route = {
    root: '/appointments',
    handlers: [ Create, List ]
}

export default route;