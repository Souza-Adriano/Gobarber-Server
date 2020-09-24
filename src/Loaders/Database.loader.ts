import { createConnection } from 'typeorm';

export default {
    name: 'Database:postgres',
    loader: async () => {
        await createConnection();
    }
}