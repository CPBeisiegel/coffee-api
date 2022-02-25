const express = require("express");
// Isso nos dá acesso aos documentos dentro do env
require("dotenv").config();
// Conectando a config do banco de dados
require("./config/db.config")();

const app = express();

app.use(express.json());

const coffeeRouter = require("./routes/coffee.routes");
app.use("/coffee-inventory", coffeeRouter);

const orderRouter = require("./routes/order.routes");
app.use("/orders", orderRouter);

// Colocar o express para ouvir as requisições
app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running #d&d - port: ${process.env.PORT}`);
});
