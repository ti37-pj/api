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

exports.BuscaTodosHoje = ( req, res ) => {

    const query = ` SELECT * FROM pedidos WHERE registro > date_format(NOW(), "%Y-%m-%d") ; `;
    connection.query( query,
        (err, results) => {
            if (err) {
                res.status(400).send(err)
            } else {
                BuscaPedidos(results)
                .then( retorno => {
                    res.status(200).send(retorno)
                })
                .catch( error => {
                    res.status(400).send(error)
                })
                
            }
        }
    );
} 

function BuscaPedidos ( pedidos) { 
    return new Promise( (resolve, reject) => {
        var results = [];
        for (const pedido of pedidos){
            //console.log(pedido)
            BuscaProdutosPedido(pedido.id)
            .then( listaProdutos => {
                //console.log(listaProdutos)
                let p = pedido;
                p = { ...p, 'produtos': listaProdutos }
                results.push(p);
                //console.log(results)
            })
            .catch( error => {
                reject(error);
            })
        }
        console.log(results)
        resolve(results);
    })

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