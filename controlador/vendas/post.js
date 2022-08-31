const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const id_cliente = req.body.id_cliente;

    const query = ` INSERT INTO vendas (id_cliente) VALUES ( ${id_cliente} ); `;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );

}