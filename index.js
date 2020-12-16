require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const randomstring = require('randomstring');

let authRoute = require('./router/auth.route');
let sinhvienRoute = require('./router/sinhvien.route');
let giangvienRoute = require('./router/giangvien.route');

let authMiddleware = require('./middleware/auth.middleware');


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser(randomstring.generate(5)));

const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.redirect('login');
});

app.use('/login', authRoute);

app.use('/sinhvien', authMiddleware.checkLogin, sinhvienRoute);
app.use('/giangvien', authMiddleware.checkLogin, giangvienRoute);

app.listen(port, () => `Server listening on ${port}`);