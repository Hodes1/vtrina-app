const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addProdutoPage, addProduto, deleteProduto, editProduto, editProdutoPage} = require('./routes/produto');
const port = 5000;

// cria a conexão com o banco de dados
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vtrina'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// endereço para o app

app.get('/', getHomePage);
app.get('/add', addProdutoPage);
app.get('/edit/:id', editProdutoPage);
app.get('/delete/:id', deleteProduto);
app.post('/add', addProduto);
app.post('/edit/:id', editProduto);

// retorna a porta que o servidor esta conectado
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});