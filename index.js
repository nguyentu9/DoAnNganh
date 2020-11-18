require('dotenv').config();
const express = require('express');
const app = express();

var sinhvienRoute = require('./router/sinhvien.route');

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.render('login');
});


app.use('/sinhvien', sinhvienRoute);


app.listen(port, () => `Server listening on ${port}`);