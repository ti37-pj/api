const { connection } = require("../../banco/banco.js");

exports.BuscaTodos = ( req, res ) => {

    const query = ` SELECT * FROM pedidos ORDER BY id DESC ; `;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}

exports.Busca = ( req, res ) => {

    const id = req.params.id;

    const query = ` SELECT * FROM pedidos WHERE id = ${ id }; `
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {

                // resultado = BuscaProdutosPedido(id);
                // results = results.concat ({'produto':resultado});
                // res.status(200).send(results)

                BuscaProdutosPedido(id)
                .then( listaProdutos => {
                    results = results.concat ({'produto':listaProdutos});
                    res.status(200).send(results)
                })
                .catch( error => {
                    results = results.concat ({'produto':error});
                    res.status(400).send(results)
                })
            }
        }
    );
}   

// Busca todos os pedidos criados na data de hoje. A data é gerada pela função sql NOW()
exports.BuscaTodosHoje = ( req, res ) => {

    //const query = ` SELECT * FROM pedidos WHERE registro > date_format(NOW(), "%Y-%m-%d") ; `;
    const query = `SELECT * FROM pedidos AS pe LEFT JOIN pedidos_produtos AS pp ON pe.id = pp.id_pedidos LEFT JOIN produtos AS pr ON pp.id_produtos = pr.id  WHERE pe.registro > date_format(NOW(), "%Y-%m-%d") ;`;
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {
                console.log(`results: ${results[0].id_pedidos}`);

                const pedidos = [];

                results.forEach((result) => {
                    // Verifica qual o índice do pedido no array pedidos:
                    const indexPedido = pedidos.findIndex((item, index) => (item.id === result.id_pedidos));
                    
                    if(indexPedido === -1) {
                    // Se o pedido ainda não foi adicionado no array pedidos:
                        pedidos.push({
                            id: result.id_pedidos,
                            registro: result.registro,
                            mesa: result.mesa,
                            observacao: result.observacao,
                            id_cliente: result.id_cliente,
                            status: result.status,
                            id_venda: result.id_venda,
                            produtos: [{
                                quantidade: result.quantidade,
                                id: result.id_produtos,
                                nome: result.nome,
                                descricao: result.descricao,
                                id_categoria: result.id_categoria,
                                imagem_url: result.imagem_url,
                                preco_custo: result.preco_custo,
                                preco_venda: result.preco_venda,
                            }]
                        })
                    } else {
                        pedidos[indexPedido].produtos.push({
                            quantidade: result.quantidade,
                            id: result.id_produtos,
                            nome: result.nome,
                            descricao: result.descricao,
                            id_categoria: result.id_categoria,
                            imagem_url: result.imagem_url,
                            preco_custo: result.preco_custo,
                            preco_venda: result.preco_venda,
                        });
                    }
                });

                res.status(200).send(pedidos);

            }
        }
    );
} 
  
/*function BuscaPedidos ( pedidos) { 
    
    return new Promise( (resolve, reject) => {
        var arrayPedidos = [];  
        
        for (const pedido of pedidos){
            console.log("for:")
            //console.log(arrayPedidos)
            
            BuscaProdutosPedido(pedido.id)
            .then( listaProdutos => {
                console.log("then:")
                //console.log(arrayPedidos)
                let p; 
                p = { ...pedido, 'produtos': listaProdutos }
                arrayPedidos.push(p);
                
            })
            .catch( error => {
                reject(error)
            })
        
        }
        console.log("end for:")
        if(arrayPedidos.id){
            resolve(arrayPedidos);
        }else{
            console.log("vazio:")
            reject("Results  vazio")
        }
    })

}*/

function BuscaProdutosPedido ( id_pedidos) { 

    return new Promise( (resolve, reject) => {

        const query = `SELECT * FROM pedidos_produtos AS pp JOIN produtos AS pr ON pp.id_produtos = pr.id WHERE pp.id_pedidos = ${ id_pedidos };` ;
    
        connection.query( query,
            (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            }
            
        );

    })

}


exports.BuscaUsuario = ( req, res ) => {

    const id_cliente = req.params.id_cliente;

    const query = ` SELECT * FROM pedidos WHERE id_cliente = ${ id_cliente }; ` 
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );

}  

exports.BuscaMesa = ( req, res ) => {

    const mesa = req.params.mesa;

    const query = ` SELECT * FROM pedidos WHERE mesa = ${ mesa }; ` 
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );

}  

exports.BuscaNaoConcluidoPorMesa = ( req, res ) => {

    const mesa = req.params.mesa;

    const query = ` SELECT * FROM pedidos WHERE mesa = ${ mesa } AND status <> "concluido"  ; ` 
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );

} 

// *********** TODO:     Trazer os produtos juntos dos pedidos
exports.BuscaNaoEnviadoPorMesa = ( req, res ) => {

    const mesa = req.params.mesa;

    const query = ` SELECT * FROM pedidos WHERE mesa = ${ mesa } AND status <> "enviado" AND status <> "concluido" ; ` 
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );

} 