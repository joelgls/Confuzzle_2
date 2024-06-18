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

//Devolve todos os topicos
exports.getAll = async (req, res) => {
  try {
      //le toda a tabela
      const response = await prisma.Topic.findMany();
      res.status(200).json(response)
  } catch (error) {
      res.status(500).json({ msg: error.message })
  }
}

//Devolve um topico indicado por um titulo
exports.getByTitle = async (req, res) => {
    //apanha o titulo enviado
    const title = req.params.title;
    try {
        const response = await prisma.Topic.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: title,
                        },
                    },
                    {
                        description: {
                            contains: title,
                        },
                    },
                ],
            },
        });       //devolve o(s) topic(s)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

  

//Devolve um topico indicado por um id
exports.getById = async (req, res) => {
  //apanha o id enviado
  const id = Number(req.params.id);
  try {
      //procura o topico com o id
      const response = await prisma.Topic.findUnique({
          where: {
              id: id,
          },
      })
      //devolve o topic
      res.status(200).json(response)
  } catch (error) {
      res.status(404).json({ msg: error.message })
  }
}

//criar um topico
exports.create = async (req, res) => {
  //apanhar os dados enviados
  const {title, description, user_id} = req.body;
  try {
      //criar um novo topico
      const topic = await prisma.Topic.create({
          data: {
              title: title,
              description: description,
              user_id: user_id,
          },
      })
      //devolve o topico criado
      res.status(201).json(topic)
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

//Devolve todos os topicos de um utilizador
exports.getAllByUserId = async (req, res) => {
    const user_id = Number(req.query.user_id); // Extract user_id from query params
    try {
      const response = await prisma.Topic.findMany({
        where: {
          user_id: user_id,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  



//apagar o topico com id passado
exports.delete = async (req, res) => {
  //le o id do topico
  const id = req.params.id;
  try {
      //delete topico
      await prisma.Topic.delete({
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

