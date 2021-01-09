const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const TaiKhoan = require('./taikhoan.model');
const GiangVien = require('./giangvien.model');
const Khoa = require('./khoa.model');
const SinhVien = require('./sinhvien.model');
const MonHoc = require('./monhoc.model');
const GiangDay = require('./giangday.model');
const HocKy = require('./hocky.model');
const NamHoc = require('./namhoc.model');
const MonHocDaDangKy = require('./monhocdadangky.model');
const DiemQuaTrinh = require('./diemquatrinh.model');


// MonHoc: 1-n :GiangDay
MonHoc.hasMany(GiangDay, { foreignKey: 'id_monhoc' });
GiangDay.belongsTo(MonHoc, { foreignKey: 'id_monhoc' });


// HocKy: 1-n :GiangDay
HocKy.hasMany(GiangDay, { foreignKey: 'id_hk' });
GiangDay.belongsTo(HocKy, { foreignKey: 'id_hk' });


// NamHoc: 1-n :GiangDay
NamHoc.hasMany(GiangDay, { foreignKey: 'id_namhoc' });
GiangDay.belongsTo(NamHoc, { foreignKey: 'id_namhoc' });

// NamHoc: 1-n :GiangDay
GiangVien.hasMany(GiangDay, { foreignKey: 'id_gv' });
GiangDay.belongsTo(GiangVien, { foreignKey: 'id_gv' });

// Khoa: 1-n :GiangVien
Khoa.hasMany(GiangVien, { foreignKey: 'id_khoa' });
GiangVien.belongsTo(Khoa, { foreignKey: 'id_khoa' });

// SinhVien: 1-n :DangKyMonHoc
SinhVien.hasMany(MonHocDaDangKy, { foreignKey: 'id_sv' });
MonHocDaDangKy.belongsTo(SinhVien, { foreignKey: 'id_sv' });

// MonHoc: 1-n :DangKyMonHoc
MonHoc.hasMany(MonHocDaDangKy, { foreignKey: 'id_monhoc' });
MonHocDaDangKy.belongsTo(MonHoc, { foreignKey: 'id_monhoc' });


module.exports = {
    TaiKhoan,
    GiangVien,
    Khoa,
    SinhVien,
    MonHoc,
    GiangDay,
    HocKy,
    MonHoc,
    MonHocDaDangKy,
    DiemQuaTrinh,
    NamHoc
}