const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const nome = req.body.nome;
    const quantidade = req.body.quantidade;
    const desconto = req.body.desconto;
    const inicio = req.body.inicio;
    const termino = req.body.termino;

    const query = ` INSERT INTO cupons (nome, quantidade, desconto, inicio, termino) VALUES ( "${nome}" , ${quantidade} , ${desconto} ,"${inicio}" , "${termino}"); `;
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );
}