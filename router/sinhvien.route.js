const { Router } = require('express');
let router = Router();
const controller = require('../controller/sinhvien.controller');


router.get('/', controller.index);
router.get('/logout', controller.logout);
router.get('/thongtinsinhvien', controller.thongTinSinhVien);

router.get('/dangkyhocphan', controller.dangKyHocPhan);
router.post('/dangkyhocphan', controller.postDangKyHocPhan);
router.post('/huyhocphan', controller.postHuyHocPhan);

router.get('/ketquahoctap', controller.ketQuaHocTap)
module.exports = router;