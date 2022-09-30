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

POST /pedidos

REQUISIÇÃO

PARAMS: -
CABEÇALHO: -
CORPO: dados do pedido.
Exemplo:
{
	"id_venda": 1
	"id_produto": 1
	"quantidade": 1,
	"mesa": 1

}

RESPOSTA

CABEÇALHO: -
CORPO: -
STATUS:
- 201: se deu certo
- 400: erro geral
- 404: pedido não encontrado


GET /pedidos/busca_todos

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
		"id_venda": 1
		"id_produto": 1
		"quantidade": 1,
		"mesa": 1
	},
	{
		"id_venda": 2
		"id_produto": 2
		"quantidade": 2,
		"mesa": 2
	}
]

GET /pedidos/:id

REQ

Parâmetros:
- id: id do cliente
Cabeçalho: nenhum
Corpo: nenhum

RES

Cabeçalho: nenhum
Corpo: dados do pedidos. Por exemplo:
{
		"id_venda": 1
		"id_produto": 1
		"quantidade": 1,
		"mesa": 1
	}
Status:
- 200: pedido lido com sucesso
- 404: pedido não existente
- 400: erro geral

==============================================================================================================================================================================================================================================================================================================================================================================

POST /funcionarios

REQUISIÇÃO

PARAMS: -
CABEÇALHO: -
CORPO: dados do pedido.
Exemplo:
{
	"id": 1
	"nome": "Kauã"
	"cargo": "Atendente",
	"contato": "11111111"
	"usuario": "kaua"
	"senha": "14234324"

}

RESPOSTA

CABEÇALHO: -
CORPO: -
STATUS:
- 201: se deu certo
- 400: erro geral
- 404: pedido não encontrado


GET /funcionarios/busca_todos

REQUISIÃO

PARAMS: -
CABEÇALHO: -
CORPO: -


RESPOSTA

CABEÇALHO: -
CORPO: lista de todos os funcionarios
Exemplo:

[
	{
		"id": 2
		"nome": "Renan"
		"cargo": "Cozinheiro",
		"contato": "15132311"
		"usuario": "renan"
		"senha": "142355656"
	},
	{
		"id": 3
		"nome": "Leandro"
		"cargo": "Gerente",
		"contato": "55678911"
		"usuario": "renan"
		"senha": "142355656"
	}
]

GET /funcionarios/:id

REQ

Parâmetros:
- id: id do funcionário
Cabeçalho: nenhum
Corpo: nenhum

RES

Cabeçalho: nenhum
Corpo: dados do pedidos. Por exemplo:
{
		"id": 3
		"nome": "Leandro"
		"cargo": "Gerente",
		"contato": "55678911"
		"usuario": "renan"
		"senha": "142355656"
	}
Status:
- 200: pedido lido com sucesso
- 404: pedido não existente
- 400: erro geral

==============================================================================================================================================================================================================================================================================================================================================================================

POST /vendas

REQUISIÇÃO

PARAMS: -
CABEÇALHO: -
CORPO: dados do pedido.
Exemplo:
{
	"id": 1
	"total_custo": 10.00
	"total_venda": "25.00",
	"forma_de_pagamento": "Cartão Débito"
	"id_cupom": 1
	"id_cliente": 1
	"id_endereco": 20.00

}

RESPOSTA

CABEÇALHO: -
CORPO: -
STATUS:
- 201: se deu certo
- 400: erro geral
- 404: venda não encontrado


GET /vendas/busca_todos

REQUISIÃO

PARAMS: -
CABEÇALHO: -
CORPO: -


RESPOSTA

CABEÇALHO: -
CORPO: lista de todos os funcionarios
Exemplo:

[
	{
		"id": 1
		"total_custo": 10.00
		"total_venda": "25.00",
		"forma_de_pagamento": "Cartão Débito"
		"id_cupom": 1
		"id_cliente": 1
		"id_endereco": 1
	},
	{
		"id": 2
		"total_custo": 20.00
		"total_venda": "25.00",
		"forma_de_pagamento": "Cartão Cébito"
		"id_cupom": 2
		"id_cliente": 2
		"id_endereco":e
	}
]

GET /vendas/:id

REQ

Parâmetros:
- id: id do funcionário
Cabeçalho: nenhum
Corpo: nenhum

RES

Cabeçalho: nenhum
Corpo: dados do pedidos. Por exemplo:
{
		"id": 3
		"nome": "Leandro"
		"cargo": "Gerente",
		"contato": "55678911"
		"usuario": "renan"
		"senha": "142355656"
	}
Status:
- 200: pedido lido com sucesso
- 404: pedido não existente
- 400: erro geral

==============================================================================================================================================================================================================================================================================================================================================================================

POST /enderecos

REQUISIÇÃO

PARAMS: -
CABEÇALHO: -
CORPO: dados do pedido.
Exemplo:
{
	"id": 1
	"numero": "20A"
	"complemento": "Casa",
	"cep": "1342423424-00"
	"cidade": "São Carlos"
	"rua": "Rua Episcopal"
	"Bairro": "Centro"
	"uf":"SP"
}

RESPOSTA

CABEÇALHO: -
CORPO: -
STATUS:
- 201: se deu certo
- 400: erro geral
- 404: endereco não cadastrado



GET /enderecos/busca_todos

REQUISIÃO

PARAMS: -
CABEÇALHO: -
CORPO: -


RESPOSTA

CABEÇALHO: -
CORPO: lista de todos os enderecos
Exemplo:

[
	{
		"id": 2
		"numero": "20A"
		"complemento": "Casa",
		"cep": "1342423424-00"
		"cidade": "São Carlos"
		"rua": "Rua Episcopal"
		"Bairro": "Centro"
		"uf":"SP"
	},
	{
		"id": 3
		"numero": "20A"
		"complemento": "Casa",
		"cep": "1342423424-00"
		"cidade": "São Carlos"
		"rua": "Rua Episcopal"
		"Bairro": "Centro"
		"uf":"SP"
	}
]

GET /enderecos/:id

REQ

Parâmetros:
- id: id do enderecos
Cabeçalho: nenhum
Corpo: nenhum

RES

Cabeçalho: nenhum
Corpo: dados do pedidos. Por exemplo:
{
		"id": 3
		"nome": "Leandro"
		"cargo": "Gerente",
		"contato": "55678911"
		"usuario": "renan"
		"senha": "142355656"
	}
Status:
- 200: enderecos lido com sucesso
- 404: enderecos não existente
- 400: erro geral

==============================================================================================================================================================================================================================================================================================================================================================================