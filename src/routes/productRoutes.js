const app = require("./app-express.js");
const { Product } = require("../models/models.js");
const { Op } = require("sequelize");

// GET / - Test route
app.get("/", (req, res) => {
  res.send("Olá, mundo");
});

// GET /v1/product/:id
app.get("/v1/product/:id", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.params.id", request.params.id);

  Product.findOne({ where: { id: request.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});

// GET /v1/product/
app.get("/v1/product", (request, res) => {
  console.log("request.url", request.url); // debug

  let {
    limit = 12,
    page = 1,
    fields,
    match,
    category_ids,
    price_range,
    ...options
  } = request.query;

  // Validação das query params
  limit = parseInt(limit);
  page = parseInt(page);

  if (isNaN(limit) || isNaN(page) || limit < -1 || page < 1) {
    return res.status(400).send({ message: "Invalid query parameters" });
  }

  const queryOptions = {
    where: {},
    limit: limit === -1 ? null : limit,
    offset: limit === -1 ? null : (page - 1) * limit,
    attributes: fields ? fields.split(",") : undefined,
  };

  if (match) {
    queryOptions.where[Op.or] = [
      { name: { [Op.like]: `%${match}%` } },
      { description: { [Op.like]: `%${match}%` } },
    ];
  }

  if (category_ids) {
    queryOptions.where.category_id = { [Op.in]: category_ids.split(",") };
  }

  if (price_range) {
    const [min, max] = price_range.split("-").map(Number);
    queryOptions.where.price = { [Op.between]: [min, max] };
  }

  Object.keys(options).forEach((option) => {
    if (option.startsWith("option[") && option.endsWith("]")) {
      const optionId = option.slice(7, -1);
      queryOptions.where[`options.${optionId}`] = {
        [Op.in]: options[option].split(","),
      };
    }
  });

  Product.findAll(queryOptions)
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      console.error("Error fetching products:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});

// POST /v1/product
app.post("/v1/product", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.body", request.body);

  // Verificação do token de autorização
  const authToken = request.headers.authorization;
  if (!authToken || authToken !== "seu_token_aqui") {
    return res.status(401).send({ message: "Unauthorized" });
  }

  Product.create(request.body)
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      console.error("Error creating product:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});

// PUT /v1/product/:id
app.put("/v1/product/:id", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.body", request.body);

  // Verificação do token de autorização
  const authToken = request.headers.authorization;
  if (!authToken || authToken !== "seu_token_aqui") {
    return res.status(401).send({ message: "Unauthorized" });
  }

  Product.update(request.body, { where: { id: request.params.id } })
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        return res.status(404).send({ message: "Product not found" });
      }
      return res.status(204).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});

// DELETE /v1/product/:id
app.delete("/v1/product/:id", (request, res) => {
  console.log("request.url", request.url); // debug

  // Verificação do token de autorização
  const authToken = request.headers.authorization;
  if (!authToken || authToken !== "seu_token_aqui") {
    return res.status(401).send({ message: "Unauthorized" });
  }

  Product.destroy({ where: { id: request.params.id } })
    .then((result) => {
      if (result === 0) {
        return res.status(404).send({ message: "Product not found" });
      }
      return res.status(204).send();
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});
