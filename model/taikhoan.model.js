const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');


const TaiKhoan = db.define('taikhoan', {
   masodangnhap: {
       type: DataTypes.STRING,
       primaryKey: true
   },
   matkhau: {
       type: DataTypes.STRING
   },
   vaitro: {
       type: DataTypes.STRING
   }
});

module.exports = TaiKhoan;