import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { Pool } from 'pg';

declare module 'fastify' {
    interface FastifyInstance {
        db: Pool;
    }
}

const dbPlugin: FastifyPluginAsync = async (fastify) => {
    const pool = new Pool({
        connectionString: fastify.config.DATABASE_URL,
    });

    try {
        const client = await pool.connect();
        client.release();
        fastify.log.info('Postgres connected');
    } catch (err) {
        fastify.log.error(err, 'Postgres connection failed');
        throw err;
    }

    fastify.decorate('db', pool);

    fastify.addHook('onClose', async () => {
        await pool.end();
    });
};

export default fp(dbPlugin, {
    name: 'db-plugin',
});
