const commentsRouter = require('express').Router();
const controller = require('../../controllers/local/comments');

//CRUD para o comments
commentsRouter.get('/', controller.getAll); //le todos
commentsRouter.get('/:id', controller.getById); //le 1 pelo id
commentsRouter.post('/create', controller.create); //criar um novo 
commentsRouter.put('/update', controller.update); //atualizar 
commentsRouter.delete('/delete/:id', controller.delete); //apagar pelo id

module.exports = commentsRouter;