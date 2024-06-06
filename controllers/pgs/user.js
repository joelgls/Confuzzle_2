const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//Testa a ligação
exports.testConnection = async (req, res) => {
    try {
        await prisma.$connect();
        res.send('Connection to PostgreSQL with success!!');
      } catch (error) {
        res.send('Error trying to connect PostgreSQL:', error);
      } finally {
        await prisma.$disconnect();
      }
}

//Devolve todos os user
exports.getAll = async (req, res) => {
  try {
      //le toda a tabela
      const response = await prisma.User.findMany();
      res.status(200).json(response)
  } catch (error) {
      res.status(500).json({ msg: error.message })
  }
}

//Devolve um user indicado por um id
exports.getById = async (req, res) => {
  //apanha o id enviado
  const id = req.params.id*1;
  try {
      //procura o user com o id
      const response = await prisma.User.findUnique({
          where: {
              id: id,
          },
      })
      //devolve o user
      res.status(200).json(response)
  } catch (error) {
      res.status(404).json({ msg: error.message })
  }
}

//criar um user
exports.create = async (req, res) => {
  //apanhar os dados enviados
  const {name, email, password } = req.body;
  try {
      //criar um novo user
      const user = await prisma.User.create({
          data: {
              name: name,
              email: email,
              password: password,
          },
      })
      //devolve o user criado
      res.status(201).json(user)
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

//Atualizar um user
exports.update = async (req, res) => {
  const { id, name, email, password} = req.body;

  try {
      //procurar o user com id e atualizar os dados
      const topic = await prisma.User.update({
          where: {
              id: id*1,
          },
          data: {
              name: name,
              email: email,
              password: password,
          },
      })
      //devolve o user atualizado
      res.status(200).json(user)
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

//apagar o user com id passado
exports.delete = async (req, res) => {
  //le o id do user
  const id = req.params.id;
  try {
      //delete user
      await prisma.User.delete({
          where: {
              id: id*1,
          },
      })
      //just return ok
      res.status(200).send("ok");
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

