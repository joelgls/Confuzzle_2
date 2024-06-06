const fs = require('fs');

//devolve todos os user
exports.getAll = async (req, res) => {
   //ler o ficheiro local
   const datajson = fs.readFileSync("data/local/data.json", "utf-8");
   //parse do json
   const data = JSON.parse(datajson);
   //devolver os user
   return res.send(data.user);

}

//devolve o user com o id
exports.getById = async (req, res) => {
    //obter o id do user
    const id = req.params.id;
    //ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //procurar um user com o id
    const user = data.user.filter(user => user.id == id);
    //devolve o user
    res.send(user);

}

//cria um user
exports.create = async (req, res) => {
    //obter o user pelas características enviadas
    const {id, name, email, password} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //adicionar user à lista
    data.user.push(req.body);
    //Criar o novo ficheiro com o user adicionado
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //devolve o novo user
    return res.status(201).send(req.body);

}

//atualiza o user
exports.update = async (req, res) => {
    //obter o user pelas características enviadas
    const {id, nme, email, password} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o user para actualizar
    const user = data.user.find(user => user.id == id);
    //atualizar as caraterísticas
    user.id = id;
    user.name = name;
    user.email = email;
    user.password = password;


    //actualizar no ficheiro json
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //devolver o user alterado
    return res.send({id, name, email, password});
}


//apaga o user com o id
exports.delete = async (req, res) => {
    //obter o id do user
    const id = req.params.id;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o indice do user a ser procurada
    const userIndex  = data.user.findIndex(user => user.id == id);
     // Verifique se o user foi encontrado
    if (userIndex !== -1) {
        // Exclua o estudante do array de estudantes
        const apagaUser = data.user.splice(userIndex, 1)[0];
        // Atualize o ficheiro json
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Retorne o user excluído como resposta
        return res.status(200).send(apagaUser);
    } else {
        // Caso o user não seja encontrado, retorne uma resposta de erro
        return res.status(404).send("Utilizador não encontrado");
    }

}

