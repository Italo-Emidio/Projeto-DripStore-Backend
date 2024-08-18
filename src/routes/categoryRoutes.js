const app = require("./app-express.js");
const { Category } = require("../models/models.js");

// GET /v1/category/:id
app.get("/v1/category/:id", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.params.id", request.params.id);

  Category.findOne({ where: { id: request.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Category not found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching category:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});

// GET /v1/category/
app.get("/v1/category", (request, res) => {
  console.log("request.url", request.url); // debug

  let { limit = 12, page = 1, fields, use_in_menu } = request.query;

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

  if (use_in_menu === "true") {
    queryOptions.where.use_in_menu = true;
  }

  Category.findAll(queryOptions)
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      console.error("Error fetching categories:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});

// POST /v1/category
app.post("/v1/category", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.body", request.body);

  Category.create(request.body)
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      console.error("Error creating category:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});

// PUT /v1/category/:id
app.put("/v1/category/:id", (request, res) => {
  console.log("request.url", request.url); // debug
  console.log("request.body", request.body);

  Category.update(request.body, { where: { id: request.params.id } })
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        return res.status(404).send({ message: "Category not found" });
      }
      return res.status(204).send();
    })
    .catch((error) => {
      console.error("Error updating category:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});

// DELETE /v1/category/:id
app.delete("/v1/category/:id", (request, res) => {
  console.log("request.url", request.url); // debug

  Category.destroy({ where: { id: request.params.id } })
    .then((result) => {
      if (result === 0) {
        return res.status(404).send({ message: "Category not found" });
      }
      return res.status(204).send();
    })
    .catch((error) => {
      console.error("Error deleting category:", error);
      res.status(400).send({ message: "Bad Request" });
    });
});
