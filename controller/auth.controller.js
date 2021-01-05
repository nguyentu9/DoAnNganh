// const {db, promisePool } = require('../db');
const db = require('../config/db');
const { TaiKhoan } = require('../model/model'); 
const jwt = require('jsonwebtoken');

module.exports.dangnhap = (req, res, next) => {
    res.render('login');
};

module.exports.postDangnhap = async (req, res) => {

    const { masodangnhap, matkhau: matkhaudangnhap } = req.body;

    if (masodangnhap.length == 0 || matkhaudangnhap.length == 0) {
        res.render('login', {
            error: 'Thông tin đăng nhập không được để trống'
        });
        return;
    }

    try {
        var row = await TaiKhoan.findOne({ 
            where: { 
                masodangnhap,
                matkhau : matkhaudangnhap
            }
        });
    } catch (e) {
        console.log(e);
    }


    if (!row) {
        res.render('login', {
            error: 'Tài khoản hoặc mật khẩu sai'
        });
        return;
    }
    let { vaitro } = row;
    let data = {
        masodangnhap,
        vaitro
    }
    
    let token = await jwt.sign(
        data, 
        process.env.JWT_KEY, 
        { expiresIn: process.env.tokenLife }
    );

    res.cookie( 'token',
        token,
        {
            httpOnly: true
        }
    );
    
    if( vaitro == 'sv') res.redirect('sinhvien');
    else res.redirect('giangvien');
};