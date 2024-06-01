const userRouter = require('express').Router();
const controller = require('../../controllers/local/user');

//CRUD para o User
userRouter.get('/', controller.getAll); //le todos
userRouter.get('/:id', controller.getById); //le 1 pelo id
userRouter.post('/create', controller.create); //criar um novo 
userRouter.put('/update', controller.update); //atualizar 
userRouter.delete('/delete/:id', controller.delete); //apagar pelo id

module.exports = userRouter;