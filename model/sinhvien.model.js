const { db } = require('../db');
var SinhVien = {
    getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM sinhvien', (err, rows) => {
                    if(err){ 
                        return reject(err);
                    }
                    return resolve(rows);
            });
        });
    },
    getOne(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM sinhvien WHERE id_sv=${db.escape(id)}`, (err, rows) => {
                if(err) return reject(err);
                return resolve(rows);
            });
        });
    }

}

module.exports = SinhVien;