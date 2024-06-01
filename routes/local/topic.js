const topicRouter = require('express').Router();
const controller = require('../../controllers/local/topic');

//CRUD para o topic
topicRouter.get('/', controller.getAll); //le todos
topicRouter.get('/:id', controller.getById); //le 1 pelo id
topicRouter.post('/create', controller.create); //criar um novo 
topicRouter.put('/update', controller.update); //atualizar 
topicRouter.delete('/delete/:id', controller.delete); //apagar pelo id

module.exports = topicRouter;