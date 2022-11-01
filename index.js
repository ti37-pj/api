// CONEXÃO DO EXPRESS
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json());
app.use(cors());

// CORS - proteção de dados e conexões
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ROTAS DO EXPRESS
const rotas = require("./rotas/rotas");
app.use( rotas );

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})