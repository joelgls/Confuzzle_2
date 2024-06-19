require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const routerLocal = require('./routes/local/index');
const routerPgs = require('./routes/pgs/index');
const publicoRouter = require('./routes/publico');
const privadoRouter = require('./routes/privado');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('templates/FrontEnd'));

app.use('/', publicoRouter);
app.use('/bo/', privadoRouter);
app.use('/api/local/', routerLocal);
app.use('/api/pgs/', routerPgs);

const port = process.env.SERVER_PORT || 4242; // Define the server port, default to 4242 if not specified
app.listen(port, () => { // Start the express server
    console.log('Express server listening on port', port); // Log server listening message
    console.log('Port open', port); // Log port open message
});

app.get('/profile', (req, res) => {
    // Retrieve user data from the server-side based on a secure token (not user ID)
    const user = getUserDataFromToken(req); // Replace with your token retrieval logic
  
    if (user) {
      // User data retrieved successfully
      res.render('profile', { user });
    } else {
      // Handle invalid token or failed user data retrieval
      res.status(401).send('Unauthorized'); // Send unauthorized response
    }
  });