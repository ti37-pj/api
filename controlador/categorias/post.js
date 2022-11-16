const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const nome = req.body.nome;

    const query = ` INSERT INTO cupons (nome) VALUES ( "${nome}" ); `;
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );
}