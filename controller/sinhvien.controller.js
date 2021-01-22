const { SinhVien,
    MonHoc,
    GiangDay,
    GiangVien,
    MonHocDaDangKy,
    DiemQuaTrinh
} = require('../model/model');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const { KiemTraTrung } = require('../helper/util');

module.exports.index = async (req, res) => {
    let { masodangnhap } = res.locals.user; // { masodangnhap, vaitro, iat...}
    try {
        var sv = await SinhVien.findOne({ where: { id_sv: masodangnhap } });
    } catch (e) {
        console.log(e);
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


async function _dangKyHocPhan(req, res, er = null, ss = null){
    try {
        let tokenDecoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
        var mssv = tokenDecoded.masodangnhap;
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
            er,
            ss
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
            _dangKyHocPhan(req, res, null, 'Đăng ký học phần thành công');
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

        var obj = thongtinMonDangDangKy; // Kiểm tra môn đang đăng ký
        var biTrung = false;
        for( let mon of thongtinMonDaDangKy) {  // với các môn đã đăng ký có trùng lịch
            if(mon.thu == obj.thu && KiemTraTrung(mon.tietday, obj.tietday)){ 
                biTrung = true;
                _dangKyHocPhan(req, res, `Lỗi bị trùng`);
                break;
            }
        }
        
        if(!biTrung){
            const _mon = await MonHocDaDangKy.create({
                id_sv: mssv,
                id_monhoc: maHP,
                nhom: nhomHP,
                id_hk: 1,
                id_namhoc: 2,
                ngaydk: new Date().toISOString().slice(0, 10)
            })
            _dangKyHocPhan(req, res, null, 'Đăng ký học phần thành công');
        }
    } catch (e) {
        console.log(e);
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
        _dangKyHocPhan(req, res, null, 'Huỷ học phần thành công');
    } catch(e){
        console.log(e);
        res.redirect('/login');
    }
}


module.exports.ketQuaHocTap = async (req, res) => {
    try {
        let tokenDecoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
        var mssv = tokenDecoded.masodangnhap;

        var sv = await SinhVien.findOne({ attributes: ['hoten'], where: { id_sv: mssv } });
         
        var dsMonHoc = await db.query(`select d.id_monhoc, m.tenmonhoc, d.nhom, m.sotinchi 
        from dangkymonhoc d 
        inner join monhoc m on d.id_monhoc = m.id_monhoc where id_sv='${mssv}';`);

        var dsDiemQuaTrinh = await DiemQuaTrinh.findAll({ where: {id_sv: mssv} });
    } catch (e) {
       console.log(e);
       return;
    }

    res.render('sinhvien/ketquahoctap',{
        hoten: sv.hoten,
        dsMonHoc: dsMonHoc[0],
        dsDiemQuaTrinh
    });
}