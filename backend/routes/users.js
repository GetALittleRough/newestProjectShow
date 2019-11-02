var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({storage: storage})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', controller.login);
router.post('/logout', function(req, res, next) {
  res.send({
    code: 20000,
    data: {
      
    }
  })
})
router.get('/getInfo', controller.getInfo)
router.post('/register', controller.register)
router.post('/whetherRegister', controller.whetherRegister)
router.post('/setInfo', controller.setInfo)
router.post('/handleUpload', upload.single('avatar'), controller.handleUpload)
module.exports = router;
