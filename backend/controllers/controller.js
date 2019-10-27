/**
 * This is the controllers logic of the hypercool project
 * @author Jason Song created at 2019-10-27 10:41:00
 */
const User = require('../models/user')

/**
 * handle login
 * @param {Obj} req username and password of user, now plain text
 * @param {Obj} res code http status, data for login and message
 * @param {middleware} next not used
 */
async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({username: username})
    if(user) {
      if(user['password'] === password) {
        res.send({
          code: 20000,
          data: {
            login: true,
            message: "login successfully!"
          }
        })
      } else {
        res.send({
          code: 20000,
          data: {
            login: false,
            message: "wrong password"
          }
        })
      }
    } else {
      res.send({
        code: 20000,
        data: {
          login: false,
          message: "no such user!"
        }
      })
    }
  } catch (err) {
    
  }
}