const db = require('../config/db');
const jwt = require('jsonwebtoken');
module.exports.kiemTraDangNhap = async (req, res, next) => {
    let token  = req.cookies.token;

    if(!token){
        res.redirect('/login');
        return;
    }

    try {
        var tokenDecoded = await jwt.verify(token, process.env.JWT_KEY);
        res.locals.user = tokenDecoded;
    } catch(e) {
        res.redirect('/login');
    }
    next();
}