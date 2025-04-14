import book_controller from './../controller/book_controller.js'
import jwtValidate  from '../config/jwt.js';

const Book = new book_controller();


async function routes (fastify, options) {

    fastify.get('/', async (request, reply) => {
      return "Welcome fastify node 2024";
    });

    fastify.get('/all',{onRequest : jwtValidate },Book.all);

}
  
export default routes