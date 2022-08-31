const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const preco_custo = req.body.preco_custo;
    const preco_venda = req.body.preco_venda;

    const query = ` INSERT INTO produtos (nome, descricao, preco_custo, preco_venda) VALUES ( "${nome}" , "${descricao}", ${preco_custo} , ${preco_venda} );`;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );

}