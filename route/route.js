import book_controller from './../controller/book_controller.js'
import jwtValidate  from '../config/jwt.js';


const Book = new book_controller();


async function routes (fastify, options) {

    fastify.get('/', async (request, reply) => {
      return "Welcome fastify node 2024";
    });

    fastify.post('/create',{onRequest : jwtValidate },Book.create);
    fastify.get('/all/:page',{onRequest : jwtValidate },Book.all);
    fastify.get('/pagecount',Book.pagecount);
    fastify.post('/update',{onRequest : jwtValidate }, Book.update);
    fastify.get('/detail/:isbn',{onRequest : jwtValidate },Book.detail);
    fastify.delete('/delete/:isbn',Book.delete);
    fastify.post('/upload',Book.upload);
    fastify.get('/isbn/:isbn',Book.checkisbn);
    
    fastify.post('/imgupdate',Book.img_update);
    fastify.post('/profile',Book.upload);
   /* fastify.post('/profile',async function(req, reply) {
  
      //console.log(files.file);
      
      const data = await req.file();
      //const data = req.body.myfiles;
      data.file 
      data.fields
      data.fieldname
      data.filename
      data.encoding
      data.mimetype
    
      const storedFile = fs.createWriteStream('./uploads/'+data.filename);
      await pump(data.file, storedFile);
      
      //reply.send(req.body.isbn.value);
      reply.send(data.fields.isbn.value);
    
    });*/

}
  
export default routes