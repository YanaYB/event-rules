import Fastify from 'fastify';
import envPlugin from './plugins/env';
import dbPlugin from './plugins/db';
import authPlugin from './plugins/auth';
import sensible from '@fastify/sensible';

const startServer = async () => {
    const app = Fastify({ logger: true });

    try {
        await app.register(envPlugin);

        await app.register(sensible);
        await app.register(dbPlugin);

        await app.register(authPlugin);

        await app.listen({
            port: app.config.PORT,
            host: '0.0.0.0'
        });

        app.log.info(`Server running on port ${app.config.PORT}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
