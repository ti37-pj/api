const { connection } = require("../../banco/banco.js");

exports.Altera = ( req, res ) => {

    const id = req.params.id;
    const nome = req.body.nome;
    const cargo = req.body.cargo;
    const contato = req.body.id_contato;
    const usuario = req.body.usuario;
    const senha = req.body.senha

    const query = ` UPDATE funcionarios SET nome = "${nome}", cargo = "${cargo}", contato = "${contato}", usuario = "${usuario}", senha = "${senha}" WHERE id = ${id};`;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}