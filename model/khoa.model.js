const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Khoa = db.define('khoa', {
    id_khoa: {
        type:DataTypes.STRING,
        primaryKey: true
    },
    tenkhoa: {
        type: DataTypes.STRING
    },
    diachi: {
        type: DataTypes.STRING
    },
    dienthoai: {
        type: DataTypes.STRING
    }
});


module.exports = Khoa;