const { SinhVien,
    MonHoc,
    GiangDay,
    GiangVien,
    MonHocDaDangKy
} = require('../model/model');
const db = require('../config/db');
const { convertDateTime } = require('../helper/util');
const jwt = require('jsonwebtoken');
const { KiemTraChuoi } = require('../helper/util');

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
    res.cookie('token', '', { expires: new Date(0) });
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
async function _dangKyHocPhan(req, res, err = null) {
    try {
        let tokenDecoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
        var mssv = tokenDecoded.masodangnhap;
    } catch (e) {
       console.log(e);
    }

    try {
        var sv = await SinhVien.findOne({ where: { id_sv: mssv } });
        var dsMon = await MonHoc.findAll({
            include: [{
                model: GiangDay,
                required: true,
                attributes: ['nhom', 'tietday', 'phonghoc', 'thu', 'tuan'],
                include: [
                    {
                        model: GiangVien,
                        required: true,
                        attributes: ['hoten']
                    }
                ]
            }]
        });

       
        let sql = `select thu, gd.id_monhoc, gd.nhom, tenmonhoc, tietday, gv.hoten, phonghoc, tuan 
                    from giangday gd 
                    inner join monhoc m on gd.id_monhoc = m.id_monhoc 
                    inner join giangvien gv on gd.id_gv = gv.id_gv 
                    where m.id_monhoc in (select dk.id_monhoc 
                                            from dangkymonhoc dk 
                                            where gd.nhom = dk.nhom and dk.id_sv = '${mssv}')
                    order by thu;`;

        var dsMonDaDangKy = await db.query(sql);

        res.render('sinhvien/dangkyhocphan', {
            hoten: sv.hoten,
            dsmonhoc: dsMon,
            dsMonDaDangKy: dsMonDaDangKy[0],
            err
        });

    } catch (e) {
        console.log(e);
    }
} 
module.exports.dangKyHocPhan = async (req, res) => {
    _dangKyHocPhan(req, res);
};

module.exports.postDangKyHocPhan = async (req, res) => {
    var { maHP, nhomHP } = req.body; //{ maHP: 30073, nhomHP: 1 }
    try {
        let tokenDecoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
        var mssv = tokenDecoded.masodangnhap;
    } catch (e) {
        res.redirect('/login');
    }

    try {
        let monHocDaDangKy = await MonHocDaDangKy.findAll({ // [{"id_monhoc":"31524","nhom":2},{"id_monhoc":"32723","nhom":2}]
            attributes: ['id_monhoc', 'nhom'],
            where: {
                id_sv: mssv,
                id_hk: 1,
                id_namhoc: 2
            }
        }); 

        // Nếu danh sách rỗng thêm môn ko cần kiểm tra
        if(monHocDaDangKy.length == 0){ 
            const _mon = await MonHocDaDangKy.create({
                id_sv: mssv,
                id_monhoc: maHP,
                nhom: nhomHP,
                id_hk: 1,
                id_namhoc: 2,
                ngaydk: new Date().toISOString().slice(0, 10)
            });
            return;
        }



        // Lấy danh sách thông tin môn học đang đăng ký
        let prm = monHocDaDangKy.map( async mon => {
            return await GiangDay.findAll({
                attributes: ['id_monhoc', 'nhom', 'tietday', 'thu'],
                where: {
                    id_hk: 1,
                    id_namhoc: 2,
                    id_monhoc: mon.id_monhoc,
                    nhom: mon.nhom
                }
            });
        });
        
        let thongtinMonDaDangKy = await Promise.all(prm);
        thongtinMonDaDangKy = thongtinMonDaDangKy.flat();
        


        // Lấy thông tin môn học đang đăng ký
        let thongtinMonDangDangKy = await GiangDay.findOne({
            attributes: ['id_monhoc', 'nhom', 'tietday', 'thu'],
            where: {
                id_hk: 1,
                id_namhoc: 2,
                id_monhoc: maHP,
                nhom: nhomHP
            }
        });
        

       

        var obj = thongtinMonDangDangKy;
        for( let mon of thongtinMonDaDangKy) {
            if(mon.thu != obj.thu && KiemTraChuoi(mon.tietday, obj.tietday)){  // trùng lịch
                const _mon = await MonHocDaDangKy.create({
                    id_sv: mssv,
                    id_monhoc: maHP,
                    nhom: nhomHP,
                    id_hk: 1,
                    id_namhoc: 2,
                    ngaydk: new Date().toISOString().slice(0, 10)
                });
            }
        }

    } catch (e) {
        console.log(e);
        return;
    }
}

module.exports.postHuyHocPhan = async (req, res) => {
    let { maHP } = req.body;
    try {
        var tokenDecoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
        var mssv = tokenDecoded.masodangnhap;

        await MonHocDaDangKy.destroy({
            where: {
                id_sv: mssv,
                id_monhoc: maHP
            }
        });
    } catch(e){
        console.log(e);
        res.redirect('/login');
    }
}