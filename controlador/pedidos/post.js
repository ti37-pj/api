const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const mesa = req.body.mesa;
    const observacao = req.body.observacao;
    const id_cliente = req.body.id_cliente;

    const query =  ` INSERT INTO pedidos ( mesa, observacao, id_cliente ) VALUES ( ${mesa}, "${observacao}", ${id_cliente} ); `;
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {
                            
                const produtos = req.body.produtos;
                const id_vendas = results.insertId; 
                
                if(!(err = InsereProdutosPedido ( produtos, id_vendas))){
                    res.status(201).send(results)
                }else{
                    res.status(400).send(err)
                }
            }
        }
    );
}

function InsereProdutosPedido ( produtos, id_pedidos) {
    for (const produto of produtos) {

        const id_produtos = produto.id_produtos;
        const quantidade = produto.quantidade;

        const query = ` INSERT INTO pedidos_produtos (id_pedidos, id_produtos, quantidade) VALUES ( ${id_pedidos}, ${id_produtos}, ${quantidade} ); ` ;
        connection.query( query,
            (err, results) => {
                if (err) {
                    return err
                } else {
                    return 0
                }
            }       
        );
    }
}