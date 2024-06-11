const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js'); // Fixed the typo in the file name

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificação de entrada
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required!" });
        }

        console.log("Checking user existence");
        const user = await prisma.User.findFirst({
            where: { email: email },
        });

        if (user) {
            console.log("User found:", user);
            
            // Comparação direta de senhas em texto simples
            if (password === user.password) {
                console.log("Password is valid");
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
                console.log('Token Payload:', payload);

                const accessToken = authenticateUtil.generateAccessToken(payload);
                console.log('Access Token:', accessToken);

                return res.status(200).json({ name: user.name, email: user.email, token: accessToken });
            } else {
                console.log("Invalid password");
                return res.status(401).json({ msg: "Invalid password!" });
            }
        } else {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found!" });
        }
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};








exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        const existingUser = await prisma.User.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use." });
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 8),
            },
        });

        res.status(201).json(user); // Corrected the variable name
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: error.message });
    }
};

exports.readToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ msg: 'Token is required' });
        }

        const decoded = await authenticateUtil.certifyAccessToken(token); // Fixed the typo in the utility name

        const id = decoded.id;
        const name = decoded.name;
        const email = decoded.email;

        res.status(200).json({ id, name, email }); // Corrected the variable name
    } catch (error) {
        res.status(401).json({ msg: error.message });
    }
};
