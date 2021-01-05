const {Router} = require('express');
const authController = require('../controller/auth.controller');
let router = Router();

router.get('/', authController.dangnhap)

router.post('/', authController.postDangnhap)

module.exports = router;