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

    const query = ` SELECT * FROM pedidos WHERE registro > date_format(NOW(), "%Y-%m-%d") ; `;
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {

                // Guarda todos os ids dos pedidos na variável
                const id_pedidos = results

                // Array final com os pedidos listados juntos dos produtos
                const pedidos_produtos = results;

                // Função recursiva
                const loopRecursivo = ( index, length ) => {

                    // Esse é o breque e também a conclusão do loop
                    if( index >= length ){
                        res.status(200).send(pedidos_produtos)
                        return;
                    }
                        
                    let id_pedido = null;
                    
                    // Guarda o id do pedido atual
                    if( id_pedidos[index] ){
                        id_pedido = id_pedidos[index].id;
                    }else{ // Se não houver, segue para o próximo loop
                        index += 1;
                        loopRecursivo(index, length)
                        return;
                    }

                    BuscaProdutosPedido(id_pedido)
                    .then(res => {

                        pedidos_produtos[index].produto = {...res};

                        // Adiciona +1 ao index e continua com a função recursiva
                        index += 1;
                        loopRecursivo(index, length)

                    })
                    .catch(res => {
                        console.log(res);
                        return; // em caso de erro da requisição ele sai da função de loop direto
                    })
                    

                }

                // Starta o loop, sempre começa do zero
                loopRecursivo(0, id_pedidos.length)

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

exports.BuscaNaoEnviadoPorMesa = ( req, res ) => {

    const mesa = req.params.mesa;

    const query = ` SELECT * FROM pedidos WHERE mesa = ${ mesa } AND status <> "enviado" AND status <> "concluido" ; ` 
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );

} 