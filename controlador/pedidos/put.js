const { connection } = require("../../banco/banco.js");

exports.Altera = ( req, res ) => {
    //console.log('teste 1')
    const mesa = req.body.mesa;
    const observacao = req.body.observacao;
    const id_cliente = req.body.id_cliente;  
    const status = req.body.status;
    const id = req.params.id;
    //console.log('teste 2')

    const query = ` UPDATE pedidos SET status = "${status}", mesa=${mesa}, observacao = "${observacao}", id_cliente = ${id_cliente} WHERE id = ${id};`;
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {
                //res.status(201).send(results)
                
                const produtos = req.body.produtos;
                
                if(!(err = InsereProdutosPedido ( produtos, id))){
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


