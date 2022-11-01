const rotas = require("express").Router();
const caminho = ( metodo ) => require("../controlador/usuarios/"+ metodo);

// GET
rotas.get("/busca_todos", caminho("get").BuscaTodos );
rotas.get("/busca/:id", caminho("get").Busca);

// POST
rotas.post("/insere", caminho("post").Insere );
rotas.post("/autentica", caminho("post").Autentica );

// DELETE
rotas.delete("/deleta/:id", caminho("delete").Deleta );

// PUT
rotas.put("/altera/:id", caminho("put").Altera );

module.exports = rotas;