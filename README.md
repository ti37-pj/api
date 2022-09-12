## API

API geral do sistema para conexão do banco de dados.

---

## Produtos

---

### Cadastra um produto.

POST /produtos

#### REQUISIÇÃO

##### PARÂMETROS: nenhum

##### CABEÇALHOS: nenhum

##### CORPO: dados do produto a ser cadastrado, em formato JSON. Por exemplo:

```plaintext
{
	"nome": "Caipirinha Clássica",
	"descricao": "Limão...",
	"precos": [
		{
			"preco_custo": 10,
			"preco_venda": 12,
			"descricao": "Cachaça"
		},
		{
			"preco_custo": 10,
			"preco_venda": 12,
			"descricao": "Vodka Nacional"
		},
		"id_cateogoria": 1
	]
}
```

#### RESPOSTA

##### CABEÇALHOS:

*   Location: a rota para ler os dados do produto cadastrado, por exemplo “/produtos/1” 

##### CORPO: nenhum

##### STATUS:

*   201: cadastrado com sucesso
*   400: falha no cadastro

---

### Ler todos os produtos

Retorna todos os produtos cadastrados no servidor.

GET /produtos

#### REQUISIÇÃO

##### PARÂMETROS: nenhum

##### CABEÇALHOS: nenhum

##### CORPO: nenhum

RESPOSTA

##### CABEÇALHOS: nenhum

##### CORPO: array dos produtos. Por exemplo:

```plaintext
[
	{
		"nome": "Caipirinha Clássica",
		"descricao": "Limão...",
		"precos": [
			{
				"preco_custo": 10,
				"preco_venda": 12,
				"descricao": "Cachaça"
			},
			{
				"preco_custo": 10,
				"preco_venda": 12,
				"descricao": "Vodka Nacional"
			}
		],
		"id_categoria": 1
	},
	{
		"nome": "Batata frita",
		"descricao": "Batata...",
		"precos": [
			{
				"preco_custo": 10,
				"preco_venda": 12,
				"descricao": "Porção pequena"
			},
			{
				"preco_custo": 10,
				"preco_venda": 12,
				"descricao": "Porção grande"
			}
		],
		"id_categoria": 2
	},
]
```

##### STATUS:

*   200: sucesso na leitura
*   400: falha na leitura

---

### Ler produto

Retorna os dados de um produto específico.

GET /produtos/:id

#### REQUISIÇÃO

##### PARÂMETROS:

*   id: id do produto.

##### CABEÇALHOS: nenhum

##### CORPO: nenhum

RESPOSTA

##### CABEÇALHOS: nenhum

##### CORPO: objeto com os dados do produto em caso de sucesso, ou nenhum caso contrário . Por exemplo:

```plaintext
{

	"id": 1,
	"nome": "Caipirinha Clássica",
	"descricao": "Limão...",
	"precos": [
		{
			"preco_custo": 10,
			"preco_venda": 12,
			"descricao": "Cachaça"
		},
		{
			"preco_custo": 10,
			"preco_venda": 12,
			"descricao": "Vodka Nacional"
		},
		"id_cateogoria": 1
	]
}
```

##### STATUS:

*   200: sucesso na leitura
*   404: produto não cadastrado
*   400: falha na leitura

POST /produtos/:id/precos
PUT /produtos/:id/precos
DELETE /produtos/:id/precos


---

## Categorias

---

### Ler todas as categorias de produtos;

Retorna todas as categorias de produtos cadastrados no servidor.

GET /categorias

#### REQUISIÇÃO

##### PARÂMETROS: nenhum

##### CABEÇALHOS: nenhum

##### CORPO: nenhum

RESPOSTA

##### CABEÇALHOS: nenhum

##### CORPO: array das categorias. Por exemplo:

```plaintext
[
	{
		"id": 1,
		"nome": "Sanduíches"
	},
	{
		"id": 2,
		"nome": "Bebidas"
	},
	{
		"id": 3,
		"nome": "Sobremesas"
	},
	{
		"id": 4,
		"nome": "Petiscos"
	},
]
```

##### STATUS:

*   200: sucesso na leitura
*   400: falha na leitura

==============================================================================================================================================================================================================================================================================================================================================================================

POST /clientes

REQUISIÇÃO

PARAMS: -
CABEÇALHO: -
CORPO: dados do cliente.
Exemplo:
{
	"nome": "Kaua",
	"telefone": "1616161616",
	"email": "adisajdisa@sdfdsf.com"
    "cpf": 1616161616 
}

RESPOSTA

CABEÇALHO: -
CORPO: -
STATUS:
- 201: se deu certo
- 400: erro geral


GET /clientes/:id

REQ

Parâmetros:
- id: id do cliente
Cabeçalho: nenhum
Corpo: nenhum

RES

Cabeçalho: nenhum
Corpo: dados do cliente. Por exemplo:
{
	"nome": "Kaua",
	"telefone": "1616161616",
	"email": "adisajdisa@sdfdsf.com"
    "cpf": 1616161616
}
Status:
- 200: cliente lido com sucesso
- 404: cliente não existente
- 400: erro geral

==============================================================================================================================================================================================================================================================================================================================================================================

GET /clientes/busca_todos

REQUISIÃO

PARAMS: -
CABEÇALHO: -
CORPO: -


RESPOSTA

CABEÇALHO: -
CORPO: lista de todos os clientes
Exemplo:

[
	{
		"id": 1,
		"nome": "Kaua",
	    "telefone": "1616161616",
	    "email": "adisajdisa@sdfdsf.com"
        "cpf": 1616161616
	},
	{
		"id": 2,
		"nome": "Isa",
	    "telefone": "1616161616",
	    "email": "adisajdisa@sdfdsf.com"
        "cpf": 15151515
	}
]

==============================================================================================================================================================================================================================================================================================================================================================================