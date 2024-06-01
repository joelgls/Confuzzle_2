const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//Testa a ligação
exports.testConnection = async (req, res) => {
    try {
        await prisma.$connect();
        res.send('Ligação bem-sucedida com o PostgreSQL!');
      } catch (error) {
        res.send('Erro ao conectar ao PostgreSQL:', error);
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
  const {nome, email, password, counter } = req.body;
  try {
      //criar um novo user
      const carro = await prisma.User.create({
          data: {
              nome: nome,
              email: email,
              password: password,
              counter: counter
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
  const { id, nome, email, password, counter } = req.body;

  try {
      //procurar o topico com id e atualizar os dados
      const topic = await prisma.Topic.update({
          where: {
              id: id*1,
          },
          data: {
              nome: nome,
              email: email,
              password: password,
              counter: counter
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

