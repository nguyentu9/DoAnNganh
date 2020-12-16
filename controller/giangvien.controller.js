const GiangVien = require('../model/giangvien.model');
const { db, promisePool } = require('../db');
module.exports.index = function (req, res) {
    res.render('giangvien/index', {
        hoten: user.hoten
    });
}
module.exports.logout = function(req, res){
    res.cookie('id', '', {expires: new Date(0)});
    res.redirect('/login');
}
module.exports.thongTinGiangVien = async function (req, res) {
    if (user.vaitro == 'gv') { // user [ masodangnhap, vaitro ]
        var giangvien = await GiangVien.getOne(user.masodangnhap); // rows[]
        res.render('giangvien/thongtingiangvien', {
            hoten: user.hoten,
            user: giangvien[0]
        });
    } else {
        res.redirect('/sinhvien/');
    }
}

module.exports.dangkyLichDay = async function (req, res) {
    if (user.vaitro == 'gv') {
        var _chuyenmon = await GiangVien.getChuyenMon(user.masodangnhap);
        
        // for(let i = 0; i < _chuyenmon.length; i++){
        //     _chuyenmon[i].id_mon
        // }





        res.render('giangvien/dangkylichday', {
            hoten: user.hoten

        });
    } else {
        res.redirect('/sinhvien');
    }
}

module.exports.lichDay = function (req, res) {
    if (user.vaitro == 'gv') {
        res.render('giangvien/lichday', {
            hoten: user.hoten
        });
    } else {
        res.render('sinhvien');
    }
}
