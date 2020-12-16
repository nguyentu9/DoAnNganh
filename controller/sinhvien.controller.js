var SinhVien = require('../model/sinhvien.model');
const { convertDateTime } = require('../helper/util');

module.exports.index = function(req, res){
    res.render('sinhvien/index', {
        hoten : user.hoten
    });
}
module.exports.logout = function(req, res){
    res.cookie('id', '', {expires: new Date(0)});
    res.redirect('/login');
}
module.exports.thongTinSinhVien = async function(req, res){
    if(user.vaitro == 'sv'){ // user [ masodangnhap, vaitro ]
        var sinhvien = await SinhVien.getOne(user.masodangnhap); // rows[]
        sinhvien[0].ngaysinh = convertDateTime(sinhvien[0].ngaysinh); // dd/MM/yyyy 
        res.render('sinhvien/thongtinsinhvien', {
            user: sinhvien[0]
        });
    } else {
        res.render('giangvien');
    }
}

module.exports.dangKyHocPhan = function(req, res) {
    res.render('sinhvien/dangkyhocphan', {
        
    });
};