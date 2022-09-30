const rotas = require("express").Router();

rotas.use("/produtos", require("./rotasProdutos.js") );
rotas.use("/funcionarios", require("./rotasFuncionarios.js") );
rotas.use("/clientes", require("./rotasClientes.js") );
rotas.use("/vendas", require("./rotasVendas.js") );
rotas.use("/pedidos", require("./rotasPedidos.js") );
rotas.use("/enderecos", require("./rotasEnderecos.js") );
rotas.use("/cupons", require("./rotasCupons.js") );
rotas.use("/categorias", require("./rotasCategorias.js") );

module.exports = rotas;