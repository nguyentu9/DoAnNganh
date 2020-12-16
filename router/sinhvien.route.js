const { Router } = require('express');
let router = Router();
const controller = require('../controller/sinhvien.controller');
const sinhvienMiddleware = require('../middleware/sinhvien.middleware');

router.get('/', sinhvienMiddleware.checkRole,controller.index);
router.get('/logout', controller.logout);
router.get('/thongtinsinhvien', controller.thongTinSinhVien)
router.get('/dangkyhocphan', controller.dangKyHocPhan);

module.exports = router;