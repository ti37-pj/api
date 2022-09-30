const { connection } = require("../../banco/banco.js");

exports.Altera = ( req, res ) => {

    const id = req.params.id;
    const nome = req.body.nome;
    const quantidade = req.body.quantidade;
    const desconto = req.body.desconto;

    const query = ` UPDATE cupons SET (nome, quantidade, desconto) VALUES ( "${nome}" , "${desconto}", ${quantidade} ) WHERE id = ${id};`;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}