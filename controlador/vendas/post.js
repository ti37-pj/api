const { connection } = require("../../banco/banco.js");

exports.Insere = ( req, res ) => {

    const total_custo = req.body.total_custo;
    const total_venda = req.body.total_venda;
    const forma_de_pagamento = req.body.forma_de_pagamento;
    const observacao = req.body.observacao;
    const id_cliente = req.body.id_cliente;

    const query = ` INSERT INTO vendas (total_custo, total_venda, forma_de_pagamento, observacao, id_cliente) VALUES ( ${total_custo}, ${total_venda}, "${forma_de_pagamento}", "${observacao}", ${id_cliente} ); `;
    connection.query( query,
        (err, results) => {

            if(err) {

                res.status(400).send(err)

            } else{

                const pedidos = req.body.pedidos;
                const id_vendas = results.insertId;

                InserePedidoVendas(pedidos, id_vendas)
                .then( value => {
                    res.status(200).send(results)
                })
                .catch( error => {
                    results = results.concat ({'pedidos':error});
                    res.status(400).send(results)
                })
            }
        }
    );
}

function InserePedidoVendas ( pedidos, id_venda) {

    return new Promise( (resolve, reject) => {

        for (const pedido of pedidos) {

            const id = pedido.id_pedidos

            const query = ` UPDATE pedidos SET status = "concluido", id_venda = ${id_venda} WHERE id = ${id};`;
            connection.query( query,
                (err, results) => {
                    if (err) {
                        reject (err)
                    } else {
                        resolve (0)
                    }
                } 
            );
        }

    });
}
