const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs/dist/bcrypt');
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
              password: bcrypt.hashSync(password, 8),
              isAdmin: false,
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
      const user = await prisma.User.update({
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


// Function to login user
exports.login = async (req, res) => {
    // Get the email and password from the request body
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await prisma.User.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        var passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Return success with user role
        res.status(200).json({ msg: "Login successful"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "An error occurred. Please try again later." }); // Send error message with status 500 (Internal Server Error)
    }
}

// Function to get user by email
exports.getUserByEmail = async (req, res) => {
    // Get the email from the request parameters
    const userEmail = req.params.email;

    try {
        // Find user by email
        const user = await prisma.User.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" }); // Send error message with status 404 (Not Found)
        }

        // Return user data with status 200 (OK)
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ msg: "Internal server error" }); // Send error message with status 500 (Internal Server Error)
    }
}