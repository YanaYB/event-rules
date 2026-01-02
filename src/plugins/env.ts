import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            OPENAI_API_KEY: string;
            OPENAI_MODEL: string;
            DATABASE_URL: string;
            PORT: number;
        };
    }
}

const envPlugin: FastifyPluginAsync = async (fastify) => {
    const schema = {
        type: 'object',
        required: [
            'OPENAI_API_KEY',
            'OPENAI_MODEL',
            'DATABASE_URL',
        ],
        properties: {
            OPENAI_API_KEY: {
                type: 'string',
            },
            OPENAI_MODEL: {
                type: 'string',
                default: 'openai/gpt-4o-mini',
            },
            DATABASE_URL: {
                type: 'string',
            },
            PORT: {
                type: 'integer',
                default: 3000,
            },
        },
    };

    await fastify.register(fastifyEnv, {
        schema,
        dotenv: true,
        confKey: 'config',
    });
};

export default fp(envPlugin, {
    name: 'env-plugin',
});