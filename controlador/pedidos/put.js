const { connection } = require("../../banco/banco.js");

exports.Altera = ( req, res ) => {

    const id = req.params.id;
    const status = req.body.status;

    const query = ` UPDATE pedidos SET status = "${status}" WHERE id = ${id};`;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}