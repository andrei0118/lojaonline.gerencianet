//Conecxão com banco de dados
const mysql = require('mysql');
const moment = require('moment');
const Gerencianet = require('gn-api-sdk-node');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//visualização cadastro de produtos
exports.view = (req, res) => {
    connection.query('SELECT * FROM produtos', (err, rows) => {
        if (!err) {
            let removedProdutos = req.query.removed;
            res.render('home', { rows });
        } else {
            console.log(err);
        }
        console.log('Os dados da tabela produtos \n', rows);
    });
}

// Busca de produtos
exports.find = (req, res) => {
    let searchTerm = req.body.search;

    connection.query('SELECT * FROM  produtos WHERE produtos_loja LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
        if (!err) {
            res.render('home', { rows });
        } else {
            console.log(err);
        }
        console.log('Busca efetuda! \n', rows);
    });
}

exports.form = (req, res) => {
    res.render('add-produtos');
}

// Adicionando novos produtos
exports.create = (req, res) => {
    const { produtos_loja, Valor } = req.body;
    let searchTerm = req.body.search;

    connection.query('INSERT INTO produtos SET produtos_loja= ?, Valor= ?', [produtos_loja, Valor], (err, rows) => {
        if (!err) {
            res.render('add-produtos', { alert: 'Produto adicionado com sucesso!' });
        } else {
            console.log(err);
        }
        console.log('Produto adicionado! \n', rows);
    });
}

// Editar produtos
exports.edit = (req, res) => {

    connection.query('SELECT * FROM produtos WHERE id= ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('edit-produtos', { rows });
        } else {
            console.log(err);
        }
        console.log('Produto editado! \n', rows);
    });
}

// Atualização dos produtos
exports.update = (req, res) => {
    const { produtos_loja, Valor } = req.body;

    connection.query('UPDATE produtos SET produtos_loja = ?, Valor = ? WHERE id = ?', [produtos_loja, Valor, req.params.id], (err, rows) => {
        if (!err) {
            connection.query('SELECT * FROM produtos WHERE id= ?', [req.params.id], (err, rows) => {

                if (!err) {
                    res.render('edit-produtos', { rows, alert: `${produtos_loja} foi atualizado com sucesso` });
                } else {
                    console.log(err);
                }
                console.log('Os dados da tabela produtos: \n', rows);
            });
        } else {
            console.log(err);
        }
        console.log('Produto atualizado! \n', rows);
    });
}

// Deletar produtos
exports.delete = (req, res) => {

    connection.query('DELETE FROM produtos WHERE id= ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.redirect('/cadastro');
        } else {
            console.log(err);
        }
        console.log('Produto deletado!: \n', rows);
    });
}

// Visualizar e comprar
exports.viewall = (req, res) => {

    connection.query('SELECT * FROM produtos', (err, rows) => {
        if (!err) {
            res.render('loja-produtos', { rows });
        } else {
            console.log(err);
        }
    });
}

// mostrando loja
exports.loja = (req, res) => {

    connection.query('SELECT * FROM produtos WHERE id= ?', [req.params.id], (err, rows) => {
        if (!err) {
            console.log(rows);
            res.render('client-form', { rows });
        } else {
            console.log(err);
        }
        console.log('Produtos da loja \n', rows);
    });
}

// gerando boleto
exports.comprar = (req, res) => {
    const { nome, cpf, telefone } = req.body;

    let produto;
    // console.log('Body da compra:',req.body,req.params); 

    connection.query('SELECT * FROM produtos WHERE id= ?', [req.params.id], (err, rows) => {
        if (!err) {
            // console.log(rows,rows[0]);
            produto = rows[0];

            const clientId = 'Client_Id_4e4327e045ceb277ed5f62db8c46c399c309e0bf';
            const clientSecret = 'Client_Secret_bb1ad596c70e1c17089cd27ec860816670412681';
            const options = {
                client_id: clientId,
                client_secret: clientSecret,
                sandbox: true
            }

            var expire = moment()
                .add(2, 'days')
                .format('YYYY-MM-DD');

            let dados_boleto = {
                payment: {
                    banking_billet: {
                        expire_at: expire,
                        customer: {
                            name: nome,
                            cpf: cpf,
                            phone_number: telefone
                        }
                    }
                },
                items: [{
                    name: produto.produtos_loja,
                    value: produto.valor,
                    amount: 1
                }]
            }

            const gerencianet = new Gerencianet(options);

            gerencianet
                .oneStep({}, dados_boleto)
                .then((resposta) => {
                    console.log('resposta emissao boleto', resposta);
                    const { charge_id, link } = resposta;

                    // User the connection
                    connection.query('INSERT INTO compras SET id_cobranca= ?, link= ?', [charge_id, link], (err, rows) => {
                        if (!err) {
                            //console.log('boleto gerado!: \n', rows);
                            res.redirect(link);
                        } else {
                            console.log(err);
                        }
                    }); 
                })

                .catch((error) => {
                    console.log('resposta de erro emissao', error);
                })
            // .done();

        } else {
            console.log(err);
        }
        console.log('Os dados da tabela produtos: \n', rows);
    });

}