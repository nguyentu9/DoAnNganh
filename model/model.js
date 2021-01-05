const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const TaiKhoan = require('./taikhoan.model');
const GiangVien = require('./giangvien.model');
const Khoa = require('./khoa.model');
const SinhVien = db.define('sinhvien', {
    id_sv: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    hoten: {
        type: DataTypes.STRING
    },
    ngaysinh: {
        type: DataTypes.DATE
    },
    noisinh: {
        type: DataTypes.STRING
    },
    gioitinh: {
        type: DataTypes.BOOLEAN
    },
    cmnd: {
        type: DataTypes.STRING
    },
    sdt: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    id_lop: {
        type: DataTypes.STRING
    }
});

const MonHoc = require('./monhoc.model');
const GiangDay = require('./giangday.model');
const HocKy = require('./hocky.model');
const NamHoc = require('./namhoc.model');
const ChuyenMon = require('./chuyenmon.model');

// MonHoc: 1-n :GiangDay
MonHoc.hasMany(GiangDay, { foreignKey: 'id_monhoc' });
GiangDay.belongsTo(MonHoc, { foreignKey: 'id_monhoc'});


// HocKy: 1-n :GiangDay
HocKy.hasMany(GiangDay, { foreignKey: 'id_hk' });
GiangDay.belongsTo(HocKy, { foreignKey: 'id_hk' });


// NamHoc: 1-n :GiangDay
NamHoc.hasMany(GiangDay, { foreignKey: 'id_namhoc' });
GiangDay.belongsTo(NamHoc, { foreignKey: 'id_namhoc' });

// NamHoc: 1-n :GiangDay
GiangVien.hasMany(GiangDay, { foreignKey: 'id_gv' });
GiangDay.belongsTo(GiangVien, { foreignKey: 'id_gv' });

// MonHoc: n-n :GiangDay
// GiangVien.belongsToMany(MonHoc, { through: ChuyenMon });
// MonHoc.belongsToMany(GiangVien, { through: ChuyenMon });


module.exports = {
    TaiKhoan,
    GiangVien,
    Khoa,
    SinhVien,
    MonHoc,
    GiangDay,
    HocKy,
    MonHoc
}