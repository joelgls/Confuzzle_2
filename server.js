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

// Route to serve the second HTML page
app.get('/page2/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find(user => user.id === userId);
    res.render('page2', { user });
  });