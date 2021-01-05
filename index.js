require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

let authRoute = require('./router/auth.route');
let sinhvienRoute = require('./router/sinhvien.route');
let giangvienRoute = require('./router/giangvien.route');

let authMiddleware = require('./middleware/auth.mdw');
const sinhvienMiddleware = require('./middleware/sinhvien.mdw');

const db = require('./config/db');
db.sync().then(() => console.log('Kết nối thành công')).catch(e => console.log('loi ' + e));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;


app.get('/', function (req, res) {
    res.redirect('login');
});

app.use('/login', authRoute);

app.use('/sinhvien', authMiddleware.kiemTraDangNhap, sinhvienMiddleware.laSinhVien, sinhvienRoute);
app.use('/giangvien', authMiddleware.kiemTraDangNhap, giangvienRoute);


app.listen(port, () => `Server listening on ${port}`);



