const userRouter = require('express').Router();
const controller = require('../../controllers/pgs/user');

//testa a ligação à BD
userRouter.get('/testeConn', controller.testConnection); 

//CRUD para users
userRouter.get('/', controller.getAll); //le todos
userRouter.get('/:id', controller.getById); //le um user indicado pelo id
userRouter.post('/create', controller.create); //criar um user
userRouter.put('/update', controller.update); //atualizar um user
userRouter.delete('/delete/:id', controller.delete); //apagar um user


module.exports = userRouter;
