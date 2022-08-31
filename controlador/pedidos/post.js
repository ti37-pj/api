const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const id_venda = req.body.id_venda;
    const id_produto = req.body.id_produto;
    const quantidade = req.body.quantidade;
    const mesa = req.body.mesa;

    const query = ` INSERT INTO pedidos (id_venda, id_produto, quantidade, mesa) VALUES ( ${id_venda} , ${id_produto} , ${quantidade} , ${mesa} ); `;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );

}