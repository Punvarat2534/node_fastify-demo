import Fastify from 'fastify'
import Route from './route/route.js'
import cors from '@fastify/cors'

const fastify = Fastify({logger: true});

fastify.register(Route);
fastify.register(cors, {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
});

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();






