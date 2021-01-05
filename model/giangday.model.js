const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const GiangDay = db.define('giangday', {
    id_giangday: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_gv: {
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
    tietday: {
        type: DataTypes.STRING
    },
    phonghoc: {
        type: DataTypes.STRING
    },
    thu: {
        type: DataTypes.INTEGER
    },
    tuan: {
        type: DataTypes.INTEGER
    }
})

module.exports = GiangDay;