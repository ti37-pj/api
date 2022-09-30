const { connection } = require("../../banco/banco.js");

exports.Altera = ( req, res ) => {

    const id = req.params.id;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const rua = req.body.rua;
    const bairro = req.body.bairro;
    const id_cliente = req.body.id_cliente;

    const query = ` UPDATE enderecos SET numero = "${numero}", complemento = "${complemento}", cep = "${cep}", cidade = "${cidade}", rua = "${rua}", bairro = "${bairro}", id_cliente = ${id_cliente} WHERE id = ${id};`;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}