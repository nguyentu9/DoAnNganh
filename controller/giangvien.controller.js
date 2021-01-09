const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const { GiangDay, GiangVien, Khoa, NamHoc, SinhVien, MonHocDaDangKy,DiemQuaTrinh } = require('../model/model');
const db = require('../config/db');
const { XoaDau } = require('../helper/util');

var Excel = require('exceljs');



// ======= MULTER ========
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname.substring(0, __dirname.lastIndexOf(`\\`))
            + '/public/uploads'));
    },
    filename: function (req, file, cb) {
        if (file.originalname.indexOf('.xlsx') === -1) {
            return cb("File không đúng định dạng !", null);
        }
        cb(null, file.originalname);
    }
})
const upload = multer({ storage }).single('file');

function uploadAsync(req, res){
    return new Promise(function(resolve,reject){
        upload(req,res,function(err){
            if(err !== undefined) return reject(err);
            resolve(req.file.path);
        });
   });
}
// ========================




// giangvien/index
module.exports.index = async (req, res) => {
    let { masodangnhap } = res.locals.user; // { masodangnhap, vaitro, iat...}
    try {
        var gv = await GiangVien.findOne({ where: { id_gv: masodangnhap } });
    } catch (e) {
        console.log(e);
        return;
    }
    res.render('giangvien/index', {
        hoten: gv.hoten
    });
}


module.exports.logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.redirect('/login');
}

// giangvien/thongtingiangvien
module.exports.thongTinGiangVien = async (req, res) => {
    let { masodangnhap } = res.locals.user;
    try {


        var gv = await GiangVien.findOne({
            where: {
                id_gv: masodangnhap
            },
            include: {
                attributes: ['tenkhoa'],
                model: Khoa,
                required: true
            }
        });
    } catch (e) {
        console.log(e);
        return;
    }

    res.render('giangvien/thongtingiangvien', {
        hoten: gv.hoten,
        user: gv
    });
}

// giangvien/dangkylichday
module.exports.dangkyLichDay = async (req, res) => {
    let { masodangnhap } = res.locals.user;

    try {
        var gv = await GiangVien.findOne({ where: { id_gv: masodangnhap } });


        let sql = `SELECT m.id_monhoc, m.tenmonhoc, sotinchi FROM monhoc m 
                    INNER JOIN chuyenmon c ON m.id_monhoc = c.id_monhoc 
                    INNER JOIN giangvien g ON c.id_gv = g.id_gv WHERE g.id_gv='${masodangnhap}'`;

        var chuyenmon = await db.query(sql);
        _chuyenmon = chuyenmon[0].flat();

        res.render('giangvien/dangkylichday', {
            hoten: gv.hoten,
            danhsachmon: _chuyenmon
        });

    } catch (e) {
        console.log(e);
        return;
    }

}

// giangvien/lichday
module.exports.lichDay = async (req, res) => {
    let { masodangnhap } = res.locals.user;

    try {
        var gv = await GiangVien.findOne({ where: { id_gv: masodangnhap } });

        let sql = `SELECT thu, g.id_monhoc, m.tenmonhoc, tietday, phonghoc, tuan, thu from giangday g 
                    INNER JOIN monhoc m on g.id_monhoc = m.id_monhoc WHERE id_gv='${masodangnhap}' order by thu;`;
        var lichday = await db.query(sql);
        _lichday = lichday[0].flat();

    } catch (e) {
        console.log(e);
        return;
    }
    res.render('giangvien/lichday', {
        hoten: gv.hoten,
        lichday: _lichday
    });
}


async function _quanLyDiem(req, res, er = null, ss = null) {
    let { masodangnhap } = res.locals.user;
    try {
        var gv = await GiangVien.findOne({ where: { id_gv: masodangnhap } });

        let sql = `SELECT m.id_monhoc, m.tenmonhoc, nhom, g.trangthai FROM giangday g 
                    INNER JOIN monhoc m on g.id_monhoc = m.id_monhoc WHERE g.id_gv = '${masodangnhap}'`;
        var diem = await db.query(sql);
        _diem = diem[0].flat();
        console.log(_diem);
    } catch (e) {
        console.log(e);
        return;
    }
    res.render('giangvien/quanlydiem', {
        hoten: gv.hoten,
        diem: _diem,
        er,
        ss
    });
}

// giangvien/quanlydiem (get)
module.exports.quanLyDiem = (req, res) => {
    _quanLyDiem(req, res);
}


// thêm điểm vào bảng diemquatrinh
async function ThemDiem(duongdan) {
    try {
        var workbook = new Excel.Workbook();
        workbook = await workbook.xlsx.readFile(duongdan);
        var ws = workbook.getWorksheet(1);
        // Mã học phần 3-2
        var maHP = ws.getRow(3).getCell(2).value;
        // Mã giáo viên
        var id_gv = ws.getRow(2).getCell(2).value;
        // Năm học 4-2
        var tennamhoc = ws.getRow(4).getCell(2).value;
        // Nhóm học phần  3-4
        var nhomHP = ws.getRow(3).getCell(4).value;

        var namhoc = await NamHoc.findOne({ attributes: ['id_namhoc'], where: { tennamhoc } });
        var { id_namhoc } = namhoc;

        // Học kỳ 4-4
        var id_hk = ws.getRow(4).getCell(4).value;

        var arr = [];
        // Sinh viên đầu tiên A7
        for (let i = 0 ; ; i++) {
            var row = ws.getRow(7 + i);
            if(row.getCell(1).value == null) break;
            arr.push({
                id_sv: row.getCell(2).value,
                id_mon: maHP,
                id_hk,
                id_namhoc,
                thuongxuyen: row.getCell(5).value,
                chuyencan: row.getCell(6).value,
                giuahocphan: row.getCell(7).value,
                thuchanh: row.getCell(8).value,
            })
        }
        let _ = await DiemQuaTrinh.bulkCreate(arr, {returning: true});
        await db.query(`update giangday set trangthai=1 where id_gv='${id_gv}' and id_monhoc='${maHP}' 
                        and nhom=${nhomHP} and id_hk=${id_hk} and id_namhoc=${id_namhoc};`);
        
    } catch(e){
        console.log(e);
    }
}

// giangvien/quanlydiem (post)
// thêm điểm cho sinh viên
module.exports.postQuanlyDiem = async (req, res) => {
    try{
        var resp = await uploadAsync(req, res);
        ThemDiem(resp);
        _quanLyDiem(req, res, null, 'Nhập điểm thành công');
    }catch(e) {
        console.log(e);
    }
}



// giangvien/filemau (post)
// xuất file excel
module.exports.postfileMau = async (req, res) => {

    let { maHP, tenHP, nhomHP } = req.body;
    let { masodangnhap } = res.locals.user; // ma giang vien

    try {
        // lấy họ tên gv
        var gv = await GiangVien.findOne({ attributes: ['hoten'], where: { id_gv: masodangnhap } });
        var hotenGV = gv.hoten;

        // lấy id_hocky, id_namhoc
        // {"id_giangday":17,"id_monhoc":"31333","nhom":2,"id_hk":1,"id_namhoc":2}
        var gd = await GiangDay.findOne({
            attributes: ['id_giangday', 'id_monhoc', 'nhom', 'id_hk', 'id_namhoc'],
            where: { id_monhoc: maHP, nhom: nhomHP }
        });
        var { id_hk, id_namhoc } = gd;


        var namhoc = await NamHoc.findOne({ attributes: ['tennamhoc'], where: { id_namhoc } });
        var { tennamhoc } = namhoc;



        // danh sách sinh viên đã đăng ký môn
        // [  
        //   {"id_sv":"018101059","hoten":"Huỳnh Toàn","id_lop":"DHCNTT18A"},
        //   {"id_sv":"018101060","hoten":"Cù Xuân Hoà","id_lop":"DHCNTT18A"},
        // ]

        var sql = `select s.id_sv, s.hoten, s.id_lop from sinhvien s 
                inner join dangkymonhoc d on s.id_sv = d.id_sv 
                where d.id_monhoc='${maHP}' 
                and d.nhom=${nhomHP} 
                and id_namhoc=${id_namhoc} and id_hk=${id_hk}`;
        var dssvDaDangMon = await db.query(sql);
        dssvDaDangMon = dssvDaDangMon[0];

        // Nếu danh sách rỗng thì ko in
        if (dssvDaDangMon.length == 0) return;

        var tenFile = `ds_diem_sv_${maHP}_${XoaDau(tenHP).split(' ').join('_')}_${Date.now()}.xlsx`;

        var fileMau = path.join(__dirname, '../public/templates', 'mau.xlsx');
        var duongdan = path.join(__dirname, '../public/templates', tenFile);
        var workbook = new Excel.Workbook();

        workbook.xlsx.readFile(fileMau)
            .then(function () {
                var ws = workbook.getWorksheet(1);

                // Tiêu đề
                ws.getRow(1).getCell(1).value = `Danh Sách Điểm Sinh Viên (Hệ điểm 10) - Học phần: ${tenHP}`;

                // Mã cán bộ 2-2
                ws.getRow(2).getCell(2).value = masodangnhap;

                // Tên cán bộ 2-4
                ws.getRow(2).getCell(4).value = hotenGV;

                // Mã học phần 3-2
                ws.getRow(3).getCell(2).value = maHP;

                // Nhóm học phần  3-4
                ws.getRow(3).getCell(4).value = nhomHP;

                // Năm học 4-2
                ws.getRow(4).getCell(2).value = tennamhoc;

                // Học kỳ 4-4
                ws.getRow(4).getCell(4).value = id_hk;

                // Sinh viên đầu tiên A7
                for (let i = 0; i < dssvDaDangMon.length; i++) {
                    var { id_sv, hoten, id_lop } = dssvDaDangMon[i];
                    var row = ws.getRow(7 + i);
                    row.getCell(1).value = (i + 1);
                    row.getCell(2).value = id_sv;
                    row.getCell(3).value = hoten;
                    row.getCell(4).value = id_lop;
                    row.commit();
                }
                workbook.xlsx.writeFile(duongdan);

                res.download(duongdan);
            })
            .catch(e => {
                console.log(e);
            })
    } catch (e) {
        console.log(e);
    }
}

