import Fastify from 'fastify';
import Route from './route/route.js';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import jwt from './route/jwt.js'

const fastify = Fastify({logger: true});
const port = process.env.PORT || 5000;
const host = ("RENDER" in process.env) ? "0.0.0.0" : "localhost";

dotenv.config();
fastify.register(Route);
fastify.register(jwt);
fastify.register(cors, {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
});

const start = async () => {
  try {
    fastify.listen({host: host, port: port }, function (err, address) {
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    });
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();






