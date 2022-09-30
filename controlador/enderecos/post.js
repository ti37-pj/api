const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const id_cliente = req.body.id_cliente;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const rua = req.body.rua;
    const bairro = req.body.bairro;

    const query = ` INSERT INTO enderecos (id_cliente, numero, complemento, cep, cidade, rua, bairro) VALUES ( ${id_cliente} , ${numero} , "${complemento}" , "${cep}", "${cidade}", "${rua}", "${bairro}" ); `;
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );

}