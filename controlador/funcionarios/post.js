const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const nome = req.body.nome;
    const cargo = req.body.cargo;
    const contato = req.body.contato;
    const usuario= req.body.usuario;
    const senha= req.body.senha;

    const query = ` INSERT INTO funcionarios (nome, cargo, contato, usuario, senha ) VALUES ( "${nome}" , "${cargo}", "${contato}" ,"${usuario}", "${senha}"); `;
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );

}