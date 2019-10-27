var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.post('/login', function(req, res, next) {
//   console.log(req.body.username)
//   res.send({
//     code: 20000,
//     data: {
//       login: true,
//       token: req.body.username
//     }
//   })
// })
router.post('/login', controller.login);
router.post('/logout', function(req, res, next) {
  res.send({
    code: 20000,
    data: {
      
    }
  })
})
module.exports = router;
