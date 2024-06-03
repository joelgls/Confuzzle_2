const privadoRouter = require('express').Router();


// Define uma rota para a página HTML
privadoRouter.get('/gerirComments', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile('C:/Users/Joel Gonçalves/Desktop/webServicePSG-main/templates/backOffice/tabelaComments');
  });

// Define uma rota para a página HTML
privadoRouter.get('/gerirTopic', (req, res) => {
  // Envie o arquivo HTML como resposta para a solicitação HTTP
  res.sendFile('C:/Users/Joel Gonçalves/Desktop/webServicePSG-main/templates/backOffice/tabelaTopic.html');
});

// Define uma rota para a página HTML
privadoRouter.get('/gerirUser', (req, res) => {
  // Envie o arquivo HTML como resposta para a solicitação HTTP
  res.sendFile('C:/Users/Joel Gonçalves/Desktop/webServicePSG-main/templates/backOffice/tabelaUser.html');
});


module.exports = privadoRouter;





