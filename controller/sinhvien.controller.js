const { SinhVien, MonHoc, GiangDay, HocKy, GiangVien } = require('../model/model');
const { convertDateTime } = require('../helper/util');
const NamHoc = require('../model/namhoc.model');

module.exports.index = async (req, res) => {
    let { masodangnhap } = res.locals.user; // { masodangnhap, vaitro, iat...}
    try {
        var sv = await SinhVien.findOne({ where: { id_sv: masodangnhap } });

    } catch (e) {
        console.log(e);
        return;
    }
    res.render('sinhvien/index', {
        hoten: sv.hoten
    });
}

module.exports.logout = (req, res) => {
    res.cookie('id', '', { expires: new Date(0) });
    res.redirect('/login');
}

module.exports.thongTinSinhVien = async (req, res) => {
    let { masodangnhap } = res.locals.user;
    var sv = await SinhVien.findOne({ where: { id_sv: masodangnhap } });
    res.render('sinhvien/thongtinsinhvien', {
        hoten: sv.hoten,
        user: sv
    });

}

module.exports.dangKyHocPhan = async (req, res) => {
    try {
        var dsmonhoc = await MonHoc.findAll({
            include: [{
                model: GiangDay,
                required: true,
                include: [
                    {
                        model: NamHoc,
                        required: true,
                        attributes: ['tennamhoc']
                    },
                    {
                        model: HocKy,
                        required: true,
                        attributes: ['tenhk']
                    },
                    {
                        model: GiangVien,
                        required: true
                    }
                ]
            }]
        });
        res.json(dsmonhoc);





    } catch (e) {
        console.log(e);
    }


    // var chitiethocphan = await SinhVien.getChiTietHocPhan();
    // var hocphandadangky = await SinhVien.getHocPhanDaDangKy();
    //res.render('sinhvien/dangkyhocphan', {
    // hoten: user.hoten,
    // danhsachhocphan,
    // chitiethocphan,
    // hocphandadangky
    //});
};

module.exports.postDangKyHocPhan = async (req, res) => {
    var { maHP, nhomHP } = req.body; //{ maHP: 30073, nhomHP: 1 }
    var mssv = req.signedCookies.id;
    var ngayHienTai = new Date().toISOString().slice(0, 10);
    var sodong = await SinhVien.insertDangKyHocPhan(mssv, maHP, nhomHP, ngayHienTai);
    console.log(sodong.insertId);
}