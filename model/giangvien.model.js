const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const GiangVien = db.define('giangvien', {
    id_gv: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    hoten: {
        type: DataTypes.STRING
    },
    gioitinh: {
        type: DataTypes.BOOLEAN
    },
    hocham: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hocvi: {
        type: DataTypes.STRING
    },
    sdt: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
});

module.exports = GiangVien;

// let x = {
//     getOne(id) {
//         return new Promise((resolve, reject) => {
//             db.query(`SELECT * FROM giangvien WHERE id_gv=${db.escape(id)}`, (err, rows) => {
//                 if (err) return reject(err);
//                 return resolve(rows);
//             });
//         });
//     },
//     getChuyenMon(id) {
//         return new Promise((resolve, reject) => {
//             let sql = `SELECT m.id_monhoc, m.tenmonhoc, sotinchi FROM monhoc m 
//             INNER JOIN chuyenmon c ON m.id_monhoc = c.id_monhoc 
//             INNER JOIN giangvien g ON c.id_gv = g.id_gv where g.id_gv=${db.escape(id)}`;

//             db.query(sql, (err, rows) => {
//                 if (err) return reject(err);
//                 return resolve(rows);
//             });
//         });
//     },
//     getLichDay(id) {
//         return new Promise((resolve, reject) => {
//             let sql = `select thu, g.id_monhoc, m.tenmonhoc, tietday, phonghoc, tuan, thu from giangday g 
//             inner join monhoc m on g.id_monhoc = m.id_monhoc where id_gv = '${id}' order by thu`;
//             db.query(sql, (err, rows) => {
//                 if (err) return reject(err);
//                 return resolve(rows);
//             });
//         });
//     },
//     getDiem(id) {
//         return new Promise((resolve, reject) => {
//             let sql = `SELECT m.id_monhoc, m.tenmonhoc, nhom FROM giangday g INNER JOIN monhoc m on g.id_monhoc = m.id_monhoc where g.id_gv = '${id}'`;
            
//             db.query(sql, (err, rows) => {
//                 if(err) return reject(err);
//                 return resolve(rows);
//             });
//         })
//     }
// }
