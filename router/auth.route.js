const {Router} = require('express');
const authController = require('../controller/auth.controller');
let router = Router();

router.get('/', authController.login)

router.post('/', authController.postLogin)

module.exports = router;