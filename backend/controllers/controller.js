/**
 * This is the controllers logic of the hypercool project
 * @author Jason Song created at 2019-10-27 10:41:00
 */
const User = require('../models/user')
const Logger = require('../utils/logger')
const logger = new Logger();
const crypto = require('crypto')

/**
 * handle login
 * @param {Obj} req username and password of user, now plain text
 * @param {Obj} res code http status, data for login and message
 * @param {middleware} next not used
 */
async function login(req, res, next) {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    res.send({
      code: 20000,
      data: {
        login: false,
        message: "must enter username or password"
      }
    })
  }
  try {
    const user = await User.findOne({username: username})
    if(user) {
      if(user['password'] === password) {
        const d = crypto.createHash('md5').update(username + password + new Date().toISOString())
        const token = d.digest('hex')
        User.updateOne({username: username}, {$set: {token: token}}).then((doc, err) => {
          if (doc) {
            logger.infoLog(`write user ${username} succefully`)
          }
          if(err) {
            console.error(err)
            logger.warnLog('failed update user')
          }
        })
        res.send({
          code: 20000,
          data: {
            login: true,
            message: "login successfully!",
            token: token
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
    logger.warnLog(err)
    res.send({
      code: 20000,
      data: {
        login: false,
        message: 'internal error!'
      }
    })
  }
}

/**
 * retrieve user information by token
 * @param {string} req token representing the user
 * @param {json} res user information
 * @param {function} next middleware
 */
async function getInfo(req, res, next) {
  const { token } = req.query
  try {
    const info = await User.findOne({token: token})
    if(info) {
      res.send({
        code: 20000,
        data: info
      })
    } else {
      res.send({
        code: 20000, 
        data: {
          status: false,
          message: "can't find user information"
        }
      })
    }
  } catch(err) {
    res.send({
      code: 20000, 
      data: {
        status: false,
        message: "can't retrieve data"
      }
    })
    logger.warnLog("error retrieve user information" + __filename + 'line 95')
  }
}
module.exports = {
  login: login,
  getInfo: getInfo
}