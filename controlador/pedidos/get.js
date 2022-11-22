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
    const query = `
        SELECT
            pe.id AS pedido_id,
            pe.registro AS pedido_registro,
            pe.mesa AS pedido_mesa,
            pe.observacao AS pedido_observacao,
            pe.id_cliente AS pedido_id_cliente,
            pe.status AS pedido_status,
            pe.id_venda AS pedido_id_venda,
            pp.quantidade AS produto_quantidade,
            pr.id AS produto_id,
            pr.registro AS produto_registro,
            pr.nome AS produto_nome,
            pr.descricao AS produto_descricao,
            pr.id_categoria AS produto_id_categoria,
            pr.imagem_url AS produto_imagem_url,
            pr.preco_custo AS produto_preco_custo,
            pr.preco_venda AS produto_preco_venda
            FROM pedidos AS pe LEFT JOIN pedidos_produtos AS pp ON pe.id = pp.id_pedidos LEFT JOIN produtos AS pr ON pp.id_produtos = pr.id  WHERE pe.registro > date_format(NOW(), "%Y-%m-%d") ;`;
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {
                //console.log(`results: ${results[0].id_pedidos}`);

                const pedidos = [];

                results.forEach((result) => {
                    // Verifica qual o índice do pedido no array pedidos:
                    const indexPedido = pedidos.findIndex((item, index) => (item.id === result.pedido_id));
                    //console.log(result)
                    
                    if(indexPedido === -1) {
                    // Se o pedido ainda não foi adicionado no array pedidos:
                        pedidos.push({
                            id: result.pedido_id,
                            registro: result.pedido_registro,
                            mesa: result.pedido_mesa,
                            observacao: result.pedido_observacao,
                            id_cliente: result.pedido_id_cliente,
                            status: result.pedido_status,
                            id_venda: result.pedido_id_venda,
                            produtos: [{
                                quantidade: result.produto_quantidade,
                                id: result.produto_id,
                                registro: result.produto_registro,
                                nome: result.produto_nome,
                                descricao: result.produto_descricao,
                                id_categoria: result.produto_id_categoria,
                                imagem_url: result.produto_imagem_url,
                                preco_custo: result.produto_preco_custo,
                                preco_venda: result.produto_preco_venda
                            }]
                        })
                    } else {
                        pedidos[indexPedido].produtos.push({
                            quantidade: result.produto_quantidade,
                            id: result.produto_id,
                            registro: result.produto_registro,
                            nome: result.produto_nome,
                            descricao: result.produto_descricao,
                            id_categoria: result.produto_id_categoria,
                            imagem_url: result.produto_imagem_url,
                            preco_custo: result.produto_preco_custo,
                            preco_venda: result.produto_preco_venda
                        });
                    }
                });

                res.status(200).send(pedidos);

            }
        }
    );
} 

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

    const query = `
        SELECT
            pe.id AS pedido_id,
            pe.registro AS pedido_registro,
            pe.mesa AS pedido_mesa,
            pe.observacao AS pedido_observacao,
            pe.id_cliente AS pedido_id_cliente,
            pe.status AS pedido_status,
            pe.id_venda AS pedido_id_venda,
            pp.quantidade AS produto_quantidade,
            pr.id AS produto_id,
            pr.registro AS produto_registro,
            pr.nome AS produto_nome,
            pr.descricao AS produto_descricao,
            pr.id_categoria AS produto_id_categoria,
            pr.imagem_url AS produto_imagem_url,
            pr.preco_custo AS produto_preco_custo,
            pr.preco_venda AS produto_preco_venda
            FROM pedidos AS pe LEFT JOIN pedidos_produtos AS pp ON pe.id = pp.id_pedidos LEFT JOIN produtos AS pr ON pp.id_produtos = pr.id  WHERE mesa = ${mesa} ;`;
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {
                //console.log(`results: ${results[0].id_pedidos}`);

                const pedidos = [];

                results.forEach((result) => {
                    // Verifica qual o índice do pedido no array pedidos:
                    const indexPedido = pedidos.findIndex((item, index) => (item.id === result.pedido_id));
                    
                    if(indexPedido === -1) {
                    // Se o pedido ainda não foi adicionado no array pedidos:
                        pedidos.push({
                            id: result.pedido_id,
                            registro: result.pedido_registro,
                            mesa: result.pedido_mesa,
                            observacao: result.pedido_observacao,
                            id_cliente: result.pedido_id_cliente,
                            status: result.pedido_status,
                            id_venda: result.pedido_id_venda,
                            produtos: [{
                                quantidade: result.produto_quantidade,
                                id: result.produto_id,
                                registro: result.produto_registro,
                                nome: result.produto_nome,
                                descricao: result.produto_descricao,
                                id_categoria: result.produto_id_categoria,
                                imagem_url: result.produto_imagem_url,
                                preco_custo: result.produto_preco_custo,
                                preco_venda: result.produto_preco_venda
                            }]
                        })
                    } else {
                        pedidos[indexPedido].produtos.push({
                            quantidade: result.produto_quantidade,
                            id: result.produto_id,
                            registro: result.produto_registro,
                            nome: result.produto_nome,
                            descricao: result.produto_descricao,
                            id_categoria: result.produto_id_categoria,
                            imagem_url: result.produto_imagem_url,
                            preco_custo: result.produto_preco_custo,
                            preco_venda: result.produto_preco_venda
                        });
                    }
                });

                res.status(200).send(pedidos);

            }
        }
    )
} 


exports.BuscaNaoConcluidoPorMesa = ( req, res ) => {

    const mesa = req.params.mesa;

    const query = `
        SELECT
            pe.id AS pedido_id,
            pe.registro AS pedido_registro,
            pe.mesa AS pedido_mesa,
            pe.observacao AS pedido_observacao,
            pe.id_cliente AS pedido_id_cliente,
            pe.status AS pedido_status,
            pe.id_venda AS pedido_id_venda,
            pp.quantidade AS produto_quantidade,
            pr.id AS produto_id,
            pr.registro AS produto_registro,
            pr.nome AS produto_nome,
            pr.descricao AS produto_descricao,
            pr.id_categoria AS produto_id_categoria,
            pr.imagem_url AS produto_imagem_url,
            pr.preco_custo AS produto_preco_custo,
            pr.preco_venda AS produto_preco_venda
            FROM pedidos AS pe LEFT JOIN pedidos_produtos AS pp ON pe.id = pp.id_pedidos LEFT JOIN produtos AS pr ON pp.id_produtos = pr.id  WHERE mesa = ${ mesa } AND status <> "concluido"  ; ` ;
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {
                //console.log(`results: ${results[0].id_pedidos}`);

                const pedidos = [];

                results.forEach((result) => {
                    // Verifica qual o índice do pedido no array pedidos:
                    const indexPedido = pedidos.findIndex((item, index) => (item.id === result.pedido_id));
                    
                    if(indexPedido === -1) {
                    // Se o pedido ainda não foi adicionado no array pedidos:
                        pedidos.push({
                            id: result.pedido_id,
                            registro: result.pedido_registro,
                            mesa: result.pedido_mesa,
                            observacao: result.pedido_observacao,
                            id_cliente: result.pedido_id_cliente,
                            status: result.pedido_status,
                            id_venda: result.pedido_id_venda,
                            produtos: [{
                                quantidade: result.produto_quantidade,
                                id: result.produto_id,
                                registro: result.produto_registro,
                                nome: result.produto_nome,
                                descricao: result.produto_descricao,
                                id_categoria: result.produto_id_categoria,
                                imagem_url: result.produto_imagem_url,
                                preco_custo: result.produto_preco_custo,
                                preco_venda: result.produto_preco_venda
                            }]
                        })
                    } else {
                        pedidos[indexPedido].produtos.push({
                            quantidade: result.produto_quantidade,
                            id: result.produto_id,
                            registro: result.produto_registro,
                            nome: result.produto_nome,
                            descricao: result.produto_descricao,
                            id_categoria: result.produto_id_categoria,
                            imagem_url: result.produto_imagem_url,
                            preco_custo: result.produto_preco_custo,
                            preco_venda: result.produto_preco_venda
                        });
                    }
                });

                res.status(200).send(pedidos);

            }
        }
    )
}  

exports.BuscaNaoEnviadoPorMesa = ( req, res ) => {

    const mesa = req.params.mesa;

    const query = `
        SELECT
            pe.id AS pedido_id,
            pe.registro AS pedido_registro,
            pe.mesa AS pedido_mesa,
            pe.observacao AS pedido_observacao,
            pe.id_cliente AS pedido_id_cliente,
            pe.status AS pedido_status,
            pe.id_venda AS pedido_id_venda,
            pp.quantidade AS produto_quantidade,
            pr.id AS produto_id,
            pr.registro AS produto_registro,
            pr.nome AS produto_nome,
            pr.descricao AS produto_descricao,
            pr.id_categoria AS produto_id_categoria,
            pr.imagem_url AS produto_imagem_url,
            pr.preco_custo AS produto_preco_custo,
            pr.preco_venda AS produto_preco_venda
            FROM pedidos AS pe LEFT JOIN pedidos_produtos AS pp ON pe.id = pp.id_pedidos LEFT JOIN produtos AS pr ON pp.id_produtos = pr.id  WHERE mesa = ${ mesa } AND status <> "enviado" AND status <> "concluido" ; ` ;
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {
                //console.log(`results: ${results[0].id_pedidos}`);

                const pedidos = [];

                results.forEach((result) => {
                    // Verifica qual o índice do pedido no array pedidos:
                    const indexPedido = pedidos.findIndex((item, index) => (item.id === result.pedido_id));
                    
                    if(indexPedido === -1) {
                    // Se o pedido ainda não foi adicionado no array pedidos:
                        pedidos.push({
                            id: result.pedido_id,
                            registro: result.pedido_registro,
                            mesa: result.pedido_mesa,
                            observacao: result.pedido_observacao,
                            id_cliente: result.pedido_id_cliente,
                            status: result.pedido_status,
                            id_venda: result.pedido_id_venda,
                            produtos: [{
                                quantidade: result.produto_quantidade,
                                id: result.produto_id,
                                registro: result.produto_registro,
                                nome: result.produto_nome,
                                descricao: result.produto_descricao,
                                id_categoria: result.produto_id_categoria,
                                imagem_url: result.produto_imagem_url,
                                preco_custo: result.produto_preco_custo,
                                preco_venda: result.produto_preco_venda
                            }]
                        })
                    } else {
                        pedidos[indexPedido].produtos.push({
                            quantidade: result.produto_quantidade,
                            id: result.produto_id,
                            registro: result.produto_registro,
                            nome: result.produto_nome,
                            descricao: result.produto_descricao,
                            id_categoria: result.produto_id_categoria,
                            imagem_url: result.produto_imagem_url,
                            preco_custo: result.produto_preco_custo,
                            preco_venda: result.produto_preco_venda
                        });
                    }
                });

                res.status(200).send(pedidos);

            }
        }
    )
}  