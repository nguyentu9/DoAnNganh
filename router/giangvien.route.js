const {Router} = require('express');
let router = Router();
const controller = require('../controller/giangvien.controller');
const giangvienMiddleware = require('../middleware/giangvien.middleware');

router.get('/', giangvienMiddleware.checkRole, controller.index);
router.get('/logout', controller.logout);
router.get('/thongtingiangvien', giangvienMiddleware.checkRole, controller.thongTinGiangVien);

router.get('/dangkylichday',giangvienMiddleware.checkRole, controller.dangkyLichDay);

router.get('/lichday',giangvienMiddleware.checkRole, controller.lichDay);

module.exports = router;