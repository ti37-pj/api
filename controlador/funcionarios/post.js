const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const nome = req.body.nome;
    const cargo = req.body.cargo;
    const contato = req.body.usuario;
    const usuario= req.body.usuario;

    const query = ` INSERT INTO funcionarios (nome, cargo, contato, usuario, ) VALUES ( "${nome}" , "${cargo}", "${contato}" ,"${usuario}"); `;
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );

}