const GiangVien = require('../model/giangvien.model');
module.exports.index = function (req, res) {
    res.render('giangvien/index', {
        hoten: user.hoten
    });
}
module.exports.logout = function (req, res) {
    res.cookie('id', '', { expires: new Date(0) });
    res.redirect('/login');
}
module.exports.thongTinGiangVien = async function (req, res) {
    var giangvien = await GiangVien.getOne(user.masodangnhap); // rows[]
    res.render('giangvien/thongtingiangvien', {
        hoten: user.hoten,
        user: giangvien[0]
    });
}

module.exports.dangkyLichDay = async function (req, res) {
    var _chuyenmon = await GiangVien.getChuyenMon(user.masodangnhap);
    res.render('giangvien/dangkylichday', {
        hoten: user.hoten,
        danhsachmon : _chuyenmon
    });
}

module.exports.lichDay = async function (req, res) {
    var _lichday = await GiangVien.getLichDay(user.masodangnhap);
    res.render('giangvien/lichday', {
        hoten: user.hoten,
        lichday : _lichday
    });
}

module.exports.quanLyDiem = async function (req, res) {
    var _diem = await GiangVien.getDiem(user.masodangnhap);
    res.render('giangvien/quanlydiem', {
        hoten: user.hoten,
        diem: _diem
    });
}