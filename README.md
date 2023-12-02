## Sistema de vendas  GN-VENDAS

### Licença  
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/andrei0118/gn-vendas/blob/master/LICENSE)

## Sobre o projeto
GN-VENDAS é uma api.rest construída durante o processo de seleção da empresa GERENCIANET. A aplicação consiste em um sistema de vendas online, onde  o administrador poderá  cadastrar  produtos de uma loja,  e seu cliente final poderá comprar e gerar o boleto de pagamento  do item desejado.
É possível dividir o projeto em 3 partes:

## Administrador
O administrador é o personagem responsável por gerenciar a loja, sendo assim ele será capaz de realizar:
### Cadastro de produtos
- **Nome do produto**

- **Preço do produto**

Com os dados em mãos, o administrador poderá realizar o cadastro, a edição ou a exclusão de produtos da loja.
## Cliente
O cliente é o usuário comum da loja, no GN-Vendas o cliente poderá realizar as seguintes operações:
### Listagem de produtos (loja)
A fim de colocar sua loja online serão listados todos produtos com a opção de comprar pela plataforma.
### Compra de produtos
Uma vez visualizado a loja, ao clicar em comprar o cliente será direcionado para uma página onde irá carregar os dados pessoais:
- Nome
-  CPF 
-  Telefone

E assim gerar um boleto para pagamento do item escolhido na loja.


##  Layouts  
![image](https://user-images.githubusercontent.com/75299828/138769853-93ec4746-5bdb-4d9c-914c-c09423c1aed4.png)
![image](https://user-images.githubusercontent.com/75299828/138769907-a2f76847-1ef7-4675-9529-0452a7fa23f7.png)
![image](https://user-images.githubusercontent.com/75299828/138776963-e7b345c3-6fe4-4095-a4aa-c0537e6aae06.png)


## Ferramentas

- [node] https://nodejs.org/en/download/
- [express]
- Mysql

## Back end
- Javascript (nodejs)
- Express

## Front end
-	HTML / Css / JavaScript

## Integrações
-	Pagamentos
- API: gn-api-sdk-node: 2.0.8


## Como executar o projeto

- Instalar as dependencias do nodejs e express.
- Instalar o simulador de servidor Xampp.
- Foi utilizado o banco de dados Mysql, sendo mysqladmin: (Usuário= "root") (senha " ").
- Abra seu terminal e digite npm start para iniciar aplicação.
- Página para cadastro de produtos: http://localhost:5000/cadastro , nesta página o administrador poderá cadastrar , editar ou mesmo deletar produtos de sua loja.
- Página de listagem (loja) de produtos: http://localhost:5000/lojaprodutos/ , nesta página o cliente poderá visualizar todos produtos cadastrados na loja e assim compra - los.
- Pagina de comprar e gerar boleto: http://localhost:5000/gerarboleto/:id , nesta página o cliente irá colocar seu dados sendo: Nome, CPF e telefone e assim gerar o boleto para efetivar a compra.




## Autor

- Andrei Camilo dos Santos
- https://www.linkedin.com/in/andrei0118-santos
