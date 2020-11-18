var express = require('express');
var router = express.Router();
var controller = require('../controller/sinhvien.controller');


router.get('/', controller.index);


module.exports = router;