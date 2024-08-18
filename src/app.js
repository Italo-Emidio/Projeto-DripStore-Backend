const app = require("./routes/app-express");
require("dotenv").config();

require("./routes/userRoutes");
require("./routes/productRoutes");
require("./routes/categoryRoutes");

const PORT = 10000;

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

module.exports = app;
