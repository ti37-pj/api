const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const id_categoria = req.body.id_categoria;
    const imagem_url = req.body.imagem_url;
    const preco_custo = req.body.preco_custo
    const preco_venda = req.body.preco_venda

    const query = ` INSERT INTO produtos (nome, descricao, id_categoria, imagem_url, preco_custo, preco_venda) VALUES ( "${nome}" , "${descricao}", ${id_categoria}, "${imagem_url}", ${preco_custo}, ${preco_venda} );`;
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );
}