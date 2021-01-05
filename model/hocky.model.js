const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const HocKy = db.define('hocky', {
    id_hk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true   
    },
    tenhk: {
        type: DataTypes.STRING
    }
});

module.exports = HocKy;