const { connection } = require("../../banco/banco.js");

exports.Deleta = ( req, res ) => {

    const id = req.params.id;

    const query = ` DELETE FROM clientes WHERE id = ${id}; `;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}