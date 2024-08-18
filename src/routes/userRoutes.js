const app = require("./app-express.js");
const { User } = require("../models/models.js");

app.get("/v1/user/:id", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.params.id", request.params.id);

  User.findOne({ where: { id: request.params.id } }).then((result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Usuário não encontrado!" });
    }
  });
});

app.post("/v1/user", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.body", request.body);

  // Verifica se os dados necessários estão presentes no corpo da requisição
  // if (!request.body.name || !request.body.email) {
  //   return res.status(400).send({ message: "Dados de solicitação inválidos!" });
  // }

  User.create(request.body).then((result) => res.status(201).send(result));
});

app.put("/v1/user/:id", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.body", request.body);

  // Verificação do token de autorização
  const authToken = request.headers.authorization;
  if (!authToken || authToken !== "seu_token_aqui") {
    return res.status(401).send({ message: "Não autorizado!" }); // Token ausente ou incorreto
  }

  // Verifica se os dados necessários estão presentes no corpo da requisição
  if (!request.body.name || !request.body.email) {
    return res.status(400).send({ message: "Dados de solicitação inválidos!" });
  }

  User.update(request.body, { where: { id: request.params.id } }).then(
    ([affectedRows]) => {
      if (affectedRows === 0) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }
      return res.status(204).send();
    }
  );
});

app.delete("/v1/user/:id", (request, res) => {
  console.log("request.url", request.url); // debug

  // Verificação do token de autorização
  const authToken = request.headers.authorization;
  if (!authToken || authToken !== "seu_token_aqui") {
    return res.status(401).send({ message: "Não autorizado!" }); // Token ausente ou incorreto
  }

  User.destroy({ where: { id: request.params.id } }).then((result) => {
    if (result === 0) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }
    return res.status(204).send();
  });
});
