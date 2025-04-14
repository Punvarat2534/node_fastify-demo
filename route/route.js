import book_controller from './../controller/book_controller.js'


const Book = new book_controller();



async function routes (fastify, options) {

    fastify.get('/', async (request, reply) => {
      return { hello: 'world' }
    });

    fastify.get('/all', Book.all);

}
  
export default routes