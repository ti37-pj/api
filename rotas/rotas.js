const rotas = require("express").Router();

rotas.use("/produtos", require("./rotasProdutos.js") );

module.exports = rotas;