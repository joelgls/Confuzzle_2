const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//Testa a ligação
exports.testConnection = async (req, res) => {
    try {
        await prisma.$connect();
        res.send('Connection to PostgreSQL with success!');
      } catch (error) {
        res.send('Error trying to connect PostgreSQL:', error);
      } finally {
        await prisma.$disconnect();
      }
}

//Devolve todos os comentarios
exports.getAll = async (req, res) => {
  try {
      //le toda a tabela
      const response = await prisma.Comments.findMany();
      res.status(200).json(response)
  } catch (error) {
      res.status(500).json({ msg: error.message })
  }
}

//Devolve um comentarios indicado por um id
exports.getById = async (req, res) => {
  //apanha o id enviado
  const id = req.params.id*1;
  try {
      //procura o comentarios com o id
      const response = await prisma.Comments.findUnique({
          where: {
              id: id,
          },
      })
      //devolve o comentarios
      res.status(200).json(response)
  } catch (error) {
      res.status(404).json({ msg: error.message })
  }
}

exports.create = async (req, res) => {
    const { description, type, user_id } = req.body;

    console.log(`Received data - Description: ${description}, UserId: ${user_id}, Type: ${type}`);

    // Validate that type is a boolean
    if (typeof type !== 'boolean') {
        return res.status(400).json({ msg: 'Type must be a boolean' });
    }

    // Validate that user_id is provided and is a number
    if (!user_id || typeof user_id !== 'number') {
        return res.status(400).json({ msg: 'User ID must be a number' });
    }

    try {
        const comment = await prisma.Comments.create({
            data: {
                description: description,
                user_id: user_id,
                type: type,
            },
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};







//Atualizar um comentario
exports.update = async (req, res) => {
  const { id, description, type } = req.body;

  try {
      //procurar o comentario com id e atualizar os dados
      const comments = await prisma.Comments.update({
          where: {
              id: id*1,
          },
          data: {
              description: description,
              type: type
          },
      })
      //devolve o comentario atualizado
      res.status(200).json(carro)
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

//apagar o comentario com id passado
exports.delete = async (req, res) => {
  //le o id do comentario
  const id = req.params.id;
  try {
      //delete comentario
      await prisma.Comments.delete({
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

