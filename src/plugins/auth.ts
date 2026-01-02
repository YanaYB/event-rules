import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';




declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest) => Promise<void>;
    }

    interface FastifyRequest {
        apiKey?: string;
    }
}

const authPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.decorate(
        'authenticate',
        async (request: FastifyRequest) => {
            const authHeader = request.headers.authorization;

            if (!authHeader) {
                throw fastify.httpErrors.unauthorized('Missing Authorization header');
            }

            const [type, apiKey] = authHeader.split(' ');

            if (type !== 'Bearer' || !apiKey) {
                throw fastify.httpErrors.unauthorized('Invalid Authorization format');
            }

            const { rows } = await fastify.db.query(
                `
                    SELECT key
                    FROM api_keys
                    WHERE key = $1
                      AND revoked_at IS NULL
                `,
                [apiKey],
            );

            if (rows.length === 0) {
                throw fastify.httpErrors.unauthorized('Invalid API key');
            }

            request.apiKey = apiKey;
        },
    );
};

export default fp(authPlugin, {
    name: 'auth-plugin',
});
