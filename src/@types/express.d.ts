import { SessionInfo } from '../Services/Sessions/service.model'

declare global {
    namespace Express {
        interface Request {
            session: SessionInfo
        }
    }
}