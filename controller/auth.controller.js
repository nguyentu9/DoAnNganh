const {db, promisePool } = require('../db');
const randomstring = require('randomstring');
module.exports.login = (req, res, next) => {
    res.render('login');
};

module.exports.postLogin = async (req, res, next) => {
    var { masodangnhap, matkhau: mkdangnhap } = req.body;
    if (masodangnhap.length == 0 || mkdangnhap.length == 0) {
        res.render('login', {
            error: 'Thông tin đăng nhập không được để trống'
        });
        return;
    }

    let sql = `select * from taikhoan where masodangnhap=${db.escape(masodangnhap)} limit 1`;
    let [rows] = await promisePool.query(sql);

    if (rows.length == 0) {
        res.render('login', {
            error: 'Tài khoản không tồn tại'
        });
        return;
    }

    let { matkhau, vaitro } = rows[0];
    if (matkhau != mkdangnhap) {
        res.render('login', {
            error: 'Tài khoản hoặc mật khẩu sai'
        });
        return;
    }
    global.user = { masodangnhap, vaitro };

    
    
    res.cookie(
        'id',
        masodangnhap,
        {
            signed: true,
            expires: new Date(Date.now() + 300000),
            httpOnly: true
        }
    );
    
    if (vaitro == 'sv') {
        let _sv = await promisePool.query(`select * from sinhvien where id_sv='${masodangnhap}'`);
        global.user.hoten  = _sv[0][0].hoten;
        res.redirect('sinhvien');
    } else {
        let _gv = await promisePool.query(`select * from giangvien where id_gv='${masodangnhap}'`);
        global.user.hoten  = _gv[0][0].hoten;
        res.redirect('giangvien');
    }

};