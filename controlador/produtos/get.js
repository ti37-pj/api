const { connection } = require("../../banco/banco.js");

exports.BuscaTodos = ( req, res ) => {

    const query = ` SELECT * FROM produtos `;
    //const query = ` SELECT produtos.*, categorias.id, categorias.nome AS nome_categoria FROM produtos JOIN categorias ON produtos.id_categoria = categorias.id ORDER BY produtos.registro DESC; `;
    connection.query( query,
        (err, results) => 
            results ? res.status(200).send(results) : res.status(400).send(err)
    );
}

exports.Busca = ( req, res ) => {

    const id = req.params.id;

    const query = ` SELECT * FROM produtos WHERE id = ${ id }; `
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );
}   

exports.BuscaTodosAleatorio = ( req, res ) => {

    const query = ` SELECT * FROM produtos
    ORDER BY RAND(); `
    connection.query( query,
        (err, results) => 
            results ? res.status(201).send(results) : res.status(400).send(err)
    );
}  
