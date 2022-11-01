const { connection } = require("../../banco/banco.js");

exports.Altera = ( req, res ) => {

    const id = req.params.id;
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.id_email;
    const cpf = req.body.cpf;
    const senha = req.body.senha;
    

    const query = ` UPDATE clientes SET nome = "${nome}", telefone = "${telefone}", email = "${email}", cpf = ${cpf}, senha = "${senha}" WHERE id = ${id};`;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}