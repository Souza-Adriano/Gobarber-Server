import { Route,  Handler} from '../../../Server';

const Status: Handler = {
    uri: '/status',
    method: 'GET',
    middlewares: [],
    handler: (request, response) => {
        response.json({
            moment: new Date().toLocaleString(),
            status: 'online'
        })
    }
}

const route: Route = {
    root: '/self',
    handlers: [ Status ]
}

export default route;