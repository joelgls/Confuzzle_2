const publicoRouter = require('express').Router();


// Define uma rota para a página HTML
publicoRouter.get('/', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile('C:/Users/Joel Gonçalves/Desktop/webServicePSG-main/templates/frontEnd/index.html');
  });


module.exports = publicoRouter;