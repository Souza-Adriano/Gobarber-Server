import { Route } from '../Core/Server/Utils';

import Self from './Self'
import Appointments from './Appointments';
import Users from './Users'
import Sessions from './Sessions'

export default [
    Self,
    Appointments,
    Users,
    Sessions
] as Route[];