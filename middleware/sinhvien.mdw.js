module.exports.laSinhVien = function(req, res, next) {
    let vaitro = res.locals.user.vaitro || "";
    if (vaitro == 'sv') {
        next();
    } else {
        res.redirect('back');
    }
}