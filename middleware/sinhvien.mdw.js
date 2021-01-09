const jwt = require('jsonwebtoken');
module.exports.laSinhVien = async (req, res, next) => {
    let token = await jwt.verify(req.cookies.token, process.env.JWT_KEY);
    if (token && token.vaitro == 'sv') {
        res.locals.user = token;
        return next();
    } else {
        res.redirect('back');
    }
}