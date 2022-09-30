const rotas = require("express").Router();
const caminho = ( metodo ) => require("../controlador/vendas/"+ metodo);

// GET
rotas.get("/busca_todos", caminho("get").BuscaTodos );
rotas.get("/busca/:id", caminho("get").Busca);

// POST
rotas.post("/insere", caminho("post").Insere );

// DELETE
// rotas.delete("/:id", caminho("delete").Remove );

module.exports = rotas;