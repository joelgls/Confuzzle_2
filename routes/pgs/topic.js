const topicRouter = require('express').Router();
const controller = require('../../controllers/pgs/topic');

//testa a ligação à BD
topicRouter.get('/testeConn', controller.testConnection); 

//CRUD para topicos
topicRouter.get('/', controller.getAll); //le todos
topicRouter.get('/:id', controller.getById); //le um topico indicado pelo id
topicRouter.get('/search/:title', controller.getByTitle);// le um topico pelo titulo
topicRouter.post('/create', controller.create); //criar um topico
topicRouter.put('/update', controller.update); //atualizar um topico
topicRouter.delete('/delete/:id', controller.delete); //apagar um topico


module.exports = topicRouter;
