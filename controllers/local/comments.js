const fs = require('fs');
const { type } = require('os');

//devolve todos os comentario
exports.getAll = async (req, res) => {
   //ler o ficheiro local
   const datajson = fs.readFileSync("data/local/data.json", "utf-8");
   //parse do json
   const data = JSON.parse(datajson);
   //devolver os comentario
   return res.send(data.comments);

}

//devolve o comentario com o id
exports.getById = async (req, res) => {
    //obter o id do comments
    const id = req.params.id;
    //ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //procurar um comentario com o id
    const comments = data.comments.filter(comments => comments.id == id);
    //devolve o comentario
    res.send(comments);

}

//cria um comentario
exports.create = async (req, res) => {
    //obter o comentario pelas características enviadas
    const {id, description, type} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //adicionar comentario à lista
    data.comments.push(req.body);
    //Criar o novo ficheiro com o comentario adicionado
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //devolve o novo comentario
    return res.status(201).send(req.body);

}

//atualiza o comentario
exports.update = async (req, res) => {
    //obter o comentario pelas características enviadas
    const {id, Marca, Detalhes, Foto} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o comentario para actualizar
    const comments = data.comments.find(comments => comments.id == id);
    //atualizar as caraterísticas
    comments.id = id;
    comments.description = description;
    comments.type = type;
    //actualizar no ficheiro json
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //devolver o comentario alterado
    return res.send({id, description, type});
}


//apaga o comentario com o id
exports.delete = async (req, res) => {
    //obter o id do comentario
    const id = req.params.id;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o indice do comentario a ser procurada
    const commentsIndex  = data.comments.findIndex(comments => comments.id == id);
     // Verifique se o comentario foi encontrado
    if (carroIndex !== -1) {
        // Exclua o estudante do array de estudantes
        const apagaCarro = data.comments.splice(carroIndex, 1)[0];
        // Atualize o ficheiro json
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Retorne o carro excluído como resposta
        return res.status(200).send(apagaCarro);
    } else {
        // Caso o carro não seja encontrado, retorne uma resposta de erro
        return res.status(404).send("Carro não encontrado");
    }

}

