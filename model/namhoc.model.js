const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const NamHoc = db.define('namhoc', {
    id_namhoc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true   
    },
    tennamhoc: {
        type: DataTypes.STRING
    }
});

module.exports = NamHoc;