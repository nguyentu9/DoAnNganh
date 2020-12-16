const { db, promisePool} = require('../db');

module.exports.checkLogin = async (req, res, next) => {
    let id = req.signedCookies.id;
    if(!id){
        res.redirect('/login');
        return;
    }
    let sql = `select * from taikhoan where masodangnhap=${db.escape(id)}`;

    let [ rows ] = await promisePool.query(sql);
    if(!rows){
        res.redirect('/login');
        return;
    }
    next();
}