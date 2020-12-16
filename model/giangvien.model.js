const { db } = require('../db');

var GiangVien = {
    getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM giangvien', (err, rows) => {
                    if(err){ 
                        return reject(err);
                    }
                    return resolve(rows);
            });
        });
    },
    getOne(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM giangvien WHERE id_gv=${db.escape(id)}`, (err, rows) => {
                if(err) return reject(err);
                return resolve(rows);
            });
        });
    },
    getChuyenMon(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM chuyenmon WHERE id_gv=${db.escape(id)}`, (err, rows) => {
                if(err) return reject(err);
                return resolve(rows);
            });
        });
    }

}

module.exports = GiangVien;