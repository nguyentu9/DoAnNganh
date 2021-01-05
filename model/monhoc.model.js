const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const MonHoc = db.define('monhoc', {
    id_monhoc: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    tenmonhoc: {
        type: DataTypes.STRING
    },
    sotinchi: {
        type: DataTypes.INTEGER
    },
    tietlythuyet: {
        type: DataTypes.INTEGER
    },
    tietthuchanh: {
        type: DataTypes.INTEGER
    },
    id_montienquyet: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = MonHoc;