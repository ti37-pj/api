const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const senha = req.body.senha;
    const usuario = req.body.usuario;
    const cargo = req.body.cargo;

    const query = ` INSERT INTO clientes (nome, telefone, email, cpf, senha, usuario, cargo) VALUES ( "${nome}" , "${telefone}", "${email}" , ${cpf} , "${senha}", "${usuario}", "${cargo}"); `;
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );
}


exports.Autentica = ( req, res ) => {

    const usuario= req.body.usuario;
    const senha= req.body.senha;

    const query = ` SELECT * FROM clientes WHERE usuario = "${usuario}" AND senha = "${senha}" ; `;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}