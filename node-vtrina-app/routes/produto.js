const fs = require('fs');

module.exports = {
    addProdutoPage: (req, res) => {
        res.render('add-produto.ejs', {
            title: "Lista de produtos | Cadastre um produto"
            , message: ''
        });
    },
    addProduto: (req, res) => {


        let nome = req.body.nome;
        let preco = req.body.preco;
        let estoque = req.body.estoque;

        // manda os detalhes do produto para o banco de dados
        let query = "INSERT INTO `produtos` (nome, preco, estoque) VALUES ('" +
            nome + "', '" + preco + "', '" + estoque + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    editProdutoPage: (req, res) => {
        let produtoId = req.params.id;
        let query = "SELECT * FROM `produtos` WHERE id = '" + produtoId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-produto.ejs', {
                title: "Modificar produto"
                , produto: result[0]
                , message: ''
            });
        });
    },
    editProduto: (req, res) => {
        let produtoId = req.params.id;
        let nome = req.body.nome;
        let preco = req.body.preco;
        let estoque = req.body.estoque;

        let query = "UPDATE `produtos` SET `nome` = '" + nome + "', `preco` = '" + preco + "', `estoque` = '" + estoque + "' WHERE `produtos`.`id` = '" + produtoId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteProduto: (req, res) => {
        let produtoId = req.params.id;
        let deleteQuery = 'DELETE FROM produtos WHERE id = "' + produtoId + '"';

        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};