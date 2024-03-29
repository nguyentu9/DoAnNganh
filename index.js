require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

let authRoute = require('./router/auth.route');
let sinhvienRoute = require('./router/sinhvien.route');
let giangvienRoute = require('./router/giangvien.route');

let authMdw = require('./middleware/auth.mdw');
let sinhvienMdw = require('./middleware/sinhvien.mdw');
let giangvienMdw = require('./middleware/giangvien.mdw');

const db = require('./config/db');
db.sync().then(() => console.log('Kết nối thành công'))
         .catch(e => console.log('Lỗi: ' + e));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



app.get('/', function (req, res) {
    res.redirect('login');
});

app.use('/login', authRoute);

app.use('/sinhvien', authMdw.kiemTraDangNhap, sinhvienMdw.laSinhVien, sinhvienRoute);
app.use('/giangvien', authMdw.kiemTraDangNhap, giangvienMdw.laGiangVien, giangvienRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => `Server listening on ${port}`);



