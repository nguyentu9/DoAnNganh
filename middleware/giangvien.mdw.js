module.exports.checkRole = function(req, res, next) {
    let vaitro_cookie = req.signedCookies.id.indexOf('T') == 1;
    if (user.vaitro == 'gv' || vaitro_cookie) {
        next();
    } else {
        res.redirect('/sinhvien/');
    }
}