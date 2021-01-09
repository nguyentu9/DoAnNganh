const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
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

module.exports = SinhVien;

