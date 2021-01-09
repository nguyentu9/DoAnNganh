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
