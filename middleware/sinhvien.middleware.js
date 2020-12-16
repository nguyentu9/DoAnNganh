module.exports.checkRole = function(req, res, next) {
    let vaitro_cookie = req.signedCookies.id.indexOf('T') >= 0 ;
    if (user.vaitro == 'sv' || vaitro_cookie) {
        next();
    } else {
        res.redirect('/giangvien/');
    }
}