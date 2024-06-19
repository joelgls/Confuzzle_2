const commentsRouter = require('express').Router();
const controller = require('../../controllers/pgs/comments.js');

//testa a ligação à BD
commentsRouter.get('/testeConn', controller.testConnection); 

//CRUD para comentario
commentsRouter.get('/', controller.getAll); //le todos
commentsRouter.get('/:id', controller.getById); //le um comentario indicado pelo id
commentsRouter.post('/create', controller.create); //criar um comentario
commentsRouter.put('/update', controller.update); //atualizar um comentario
commentsRouter.delete('/delete/:id', controller.delete); //apagar um comentario


module.exports = commentsRouter;
