const fs = require('fs');

//devolve todos os topicos
exports.getAll = async (req, res) => {
   //ler o ficheiro local
   const datajson = fs.readFileSync("data/local/data.json", "utf-8");
   //parse do json
   const data = JSON.parse(datajson);
   //devolver os topicos
   return res.send(data.topic);

}

//devolve o topico com o id
exports.getById = async (req, res) => {
    //obter o id do topico
    const id = req.params.id;
    //ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //procurar um topic com o id
    const topic = data.topic.filter(topic => topic.id == id);
    //devolve o topico
    res.send(topic);

}

//cria um topico
exports.create = async (req, res) => {
    //obter o topico pelas características enviadas
    const {id, title, description, comments_id, user_id} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //adicionar topico à lista
    data.topic.push(req.body);
    //Criar o novo ficheiro com o topico adicionado
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //devolve o novo carro
    return res.status(201).send(req.body);

}

//atualiza o topico
exports.update = async (req, res) => {
    //obter o topico pelas características enviadas
    const {id, title, description, comments_id, user_id} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o topico para actualizar
    const topic = data.topic.find(topic => topic.id == id);
    //atualizar as caraterísticas
    topic.id = id;
    topic.title = title;
    topic.description = description;
    topic.comments_id = comments_id;
    topic.user_id = user_id;
    //actualizar no ficheiro json
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //devolver o topico alterado
    return res.send({id, title, description, comments_id, user_id});
}


//apaga o topico com o id
exports.delete = async (req, res) => {
    //obter o id do topico
    const id = req.params.id;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o indice do topico a ser procurada
    const topicIndex  = data.topic.findIndex(topic => topic.id == id);
     // Verifique se o topico foi encontrado
    if (topicIndex !== -1) {
        // Exclua o estudante do array de estudantes
        const apagaTopic = data.topic.splice(topicIndex, 1)[0];
        // Atualize o ficheiro json
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Retorne o carro excluído como resposta
        return res.status(200).send(apagaTopic);
    } else {
        // Caso o tópico não seja encontrado, retorne uma resposta de erro
        return res.status(404).send("Tópico não encontrado");
    }

}

