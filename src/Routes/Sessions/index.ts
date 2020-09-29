import { Route,  Handler} from '../../Core/Server';
import SessionsService from '../../Services/Sessions'

const service = new SessionsService()
const Create: Handler = {
    uri: '/',
    method: 'POST',
    middlewares: [],
    handler: async (request, response) => {
        try {
            const { email, password } = request.body;
            const { name, token } = await service.create({email, password})
            response.json({ name, token })
        } catch (error) {
            console.log(error)
            response.status(400).json({error: error.message})
        }
    }
}

const route: Route = {
    root: '/sessions',
    handlers: [ Create ]
}

export default route;