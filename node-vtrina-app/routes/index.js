module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `produtos` ORDER BY id ASC"; 

        // executa o query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Lista de produtos | Ver produtos"
                ,produtos: result
            });
        });
    },
};