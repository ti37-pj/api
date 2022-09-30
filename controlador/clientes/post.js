const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const senha = req.body.senha;

    const query = ` INSERT INTO clientes (nome, telefone, email, cpf, senha) VALUES ( "${nome}" , "${telefone}", "${email}" , ${cpf} , "${senha}"); `;
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );

}