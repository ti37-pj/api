const rotas = require("express").Router();
const caminho = ( metodo ) => require("../controlador/pedidos/"+ metodo);

// GET
rotas.get("/busca_todos", caminho("get").BuscaTodos );
rotas.get("/busca/:id", caminho("get").Busca);
rotas.get("/busca_usuario/:id", caminho("get").BuscaUsuario);
rotas.get("/busca_mesa/:mesa", caminho("get").BuscaMesa);
rotas.get("/busca_nao_concluido_por_mesa/:mesa", caminho("get").BuscaNaoConcluidoPorMesa);

// POST
rotas.post("/insere", caminho("post").Insere );

// PUT
rotas.put("/altera/:id", caminho("put").Altera );

// DELETE
// rotas.delete("/:id", caminho("delete").Remove );

module.exports = rotas;