const { db } = require('../db');
var SinhVien = {
    getDanhSachHocPhan() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT DISTINCT m.id_monhoc, m.tenmonhoc,m.sotinchi FROM giangday gd INNER JOIN monhoc m on gd.id_monhoc = m.id_monhoc`;
            db.query(sql, (err, rows) => {
                if(err) return reject(err);
                return resolve(rows);
            });
        })
    },
    getChiTietHocPhan() {
        return new Promise( (resolve, reject) => {
            let sql = "SELECT thu, m.id_monhoc, nhom, m.tenmonhoc, tietday, gv.hoten, phonghoc, tuan FROM giangday gd INNER JOIN giangvien gv on gd.id_gv = gv.id_gv INNER JOIN monhoc m on gd.id_monhoc = m.id_monhoc ORDER BY thu";
            db.query(sql, (err, rows) => {
                if(err) return reject(err);
                return resolve(rows);
            });
        });
    },
    insertDangKyHocPhan(mssv, maHP,nhomHP, ngaydangky){
        return new Promise( (resolve, reject) => {
            let sql = `INSERT INTO dangkymonhoc VALUES(null, '${mssv}', '${maHP}', ${nhomHP}, 1, 2, '${ngaydangky}', null)`;
            db.query(sql, (err, rows) => {
                if(err) return reject(err);
                return resolve(rows);
            });
        });
    },
    getHocPhanDaDangKy(mssv) {
        return new Promise((resolve, reject) => {
            let sql = `select thu, m.id_monhoc, gd.nhom, tenmonhoc, tiethoc, gd.id_gv, phonghoc, tuan from giangday gd inner join monhoc m on gd.id_monhoc = m.id_monhoc inner join giangvien gv on gd.id_gv = gv.id_gv inner join dangkymonhoc dk on gd.id_monhoc = dk.id_monhoc where id_sv = '${mssv}'`; 
            db.query(sql, (err, rows) => {
                if(err) return reject(err);
                return resolve(rows);
            });
        });
    }
}

module.exports = SinhVien;

