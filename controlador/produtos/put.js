const { connection } = require("../../banco/banco.js");

exports.Altera = ( req, res ) => {

    const id = req.params.id;
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const id_categoria = req.body.id_categoria;
    const imagem_url = req.body.imagem_url;
    const preco_custo = req.body.preco_custo;
    const preco_venda = req.body.preco_venda;

    const query = ` UPDATE produtos SET nome = "${nome}", descricao = "${descricao}", id_categoria = ${id_categoria}, imagem_url = "${imagem_url}", preco_custo = ${preco_custo}, preco_venda = ${preco_venda} WHERE id = ${id};`;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}