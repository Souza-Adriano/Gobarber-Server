import { Route,  Handler} from '../../Core/Server';
import AppointmentsService from '../../Services/Appointments'
import authMiddleware from '../../Middlewares/authentication.middleware'

const service = new AppointmentsService()
const Create: Handler = {
    uri: '/',
    method: 'POST',
    middlewares: [authMiddleware],
    handler: async (request, response) => {
        try {
            console.log('Create:handler', true)
            const { provider_id, date } = request.body
            
            const resultset = await service.create({provider_id, date})
            response.json(resultset)
        } catch (error) {
            console.log(error)
            response.status(400).json({error: error.message})
        }
    }
}

const List: Handler = {
    uri: '/',
    method: 'GET',
    middlewares: [authMiddleware],
    handler: async (request, response) => {
        try {
            const resultset = await service.list();
            response.json(resultset)
        } catch (error) {
            console.log(error)
            response.status(400).json({error: error.message})
        }
    }
}

const route: Route = {
    root: '/appointments',
    handlers: [ Create, List ]
}

export default route;