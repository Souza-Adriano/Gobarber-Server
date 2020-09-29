import { Route,  Handler} from '../../Core/Server';
import UsersService from '../../Services/Users';

const service = new UsersService();

const Create: Handler = {
    uri: '/',
    method: 'POST',
    middlewares: [],
    handler: async (request, response) => {
        try {
            const serviceResponse = await service.create(request.body);
            response.json({
                message: 'User created successfully',
                content: serviceResponse
            })
        } catch (error) {
            console.log(error)
            response.status(400).json({error: error.message})
        }
    }
}

const List: Handler = {
    uri: '/',
    method: 'GET',
    middlewares: [],
    handler: async (request, response) => {
        try {
            const serviceResponse = await service.list();
            response.json({
                message: 'User created successfully',
                content: serviceResponse
            })
        } catch (error) {
            console.log(error)
            response.status(400).json({error: error.message})
        }
    }
}

const route: Route = {
    root: '/users',
    handlers: [ Create, List ]
}

export default route;