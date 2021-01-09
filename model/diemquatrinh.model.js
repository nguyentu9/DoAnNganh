const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const DiemQuaTrinh = db.define('diemquatrinh', {
    id_diemqt: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_sv: {
        type: DataTypes.STRING
    },
    id_mon: {
        type: DataTypes.STRING
    },
    id_hk: {
        type: DataTypes.INTEGER
    },
    id_namhoc: {
        type: DataTypes.INTEGER
    },
    thuongxuyen: {
        type: DataTypes.INTEGER
    },
    chuyencan: {
        type: DataTypes.INTEGER
    },
    giuahocphan: {
        type: DataTypes.INTEGER
    },
    thuchanh: {
        type: DataTypes.INTEGER
    }
});

module.exports = DiemQuaTrinh;