import { Route,  Handler} from '../../Core/Server';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsService from '../../Services/Appointments'
import AppointmentsRepository from '../../Repositories/Appointments.repository'
import { getCustomRepository } from 'typeorm'
import ServiceUtils from '../../Services/service.util'

const service = new AppointmentsService()

const Create: Handler = {
    uri: '/',
    method: 'POST',
    middlewares: [],
    handler: async (request, response) => {
        try {
            console.log('Create:handler', true)
            const { provider, date } = request.body
            //const service = getCustomRepository(AppointmentsRepository)
            const resultset = await service.create({provider, date})
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
    middlewares: [],
    handler: async (request, response) => {
        //const service = getCustomRepository(AppointmentsRepository)
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