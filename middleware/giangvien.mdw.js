const jwt = require('jsonwebtoken');
module.exports.laGiangVien = async (req, res, next) => {
    let token = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
    if (token && token.vaitro == 'gv') {
        next();
    } else {
        res.redirect('/login');
    }
}