const {Router} = require('express');
let router = Router();

const controller = require('../controller/giangvien.controller');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname.substring(0, __dirname.lastIndexOf(`\\`))
            + '/public/uploads'));
    },
    filename: function (req, file, cb) {
        if (file.originalname.indexOf('.xlsx') === -1) {
            return cb("File không đúng định dạng !", null);
        }
        cb(null, file.originalname);
    }
})
const upload = multer({ storage }).single('file');

function uploadAsync(req, res){
    return new Promise(function(resolve,reject){
        upload(req,res,function(err){
            if(err !== undefined) return reject(err);
            resolve();
        });
   });
}


router.get('/',  controller.index);
router.get('/logout', controller.logout);
router.get('/thongtingiangvien', controller.thongTinGiangVien);

router.get('/dangkylichday', controller.dangkyLichDay);

router.get('/lichday', controller.lichDay);

router.get('/quanlydiem', controller.quanLyDiem);
router.post('/quanlydiem', controller.postQuanlyDiem);
router.post('/fileMau', controller.postfileMau);
module.exports = router;