const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const MonHocDaDangKy = db.define('dangkymonhoc', {
    id_dkmh: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_sv: {
        type: DataTypes.STRING
    },
    id_monhoc: {
        type: DataTypes.STRING
    },
    nhom: {
        type: DataTypes.INTEGER
    },
    id_hk: {
        type: DataTypes.INTEGER
    },
    id_namhoc: {
        type: DataTypes.INTEGER
    },
    ngaydk: {
        type: DataTypes.DATE
    },
    ngayhuydk: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = MonHocDaDangKy;