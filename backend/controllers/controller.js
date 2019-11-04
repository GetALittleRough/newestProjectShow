/**
 * This is the controllers logic of the hypercool project
 * @author Jason Song created at 2019-10-27 10:41:00
 */
const User = require('../models/user')
const Image = require('../models/image')
const Logger = require('../utils/logger')
const logger = new Logger();
const crypto = require('crypto')
const config = require('../config/config').config
const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI({host: config.ipfs_api, port: '5001', protocol: 'http'});
const fs = require('fs')
const driver = require('bigchaindb-driver')
const conn = new driver.Connection(config.api_path)

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
    logger.warnLog("error retrieve user information" + __filename + 'line 113')
  }
}

/**
 * register user
 * @param {Obj} req containing basic informations
 * @param {String} res token after register
 * @param {Func} next middleware
 */
async function register(req, res, next) {
  const {username, mail, password} = req.body
  const d = crypto.createHash('md5').update(username + password + new Date().toISOString())
  const token = d.digest('hex')
  const user = new User({
    username: username,
    mail: mail,
    password: password,
    token: token,
    avatar: `${config.serverUrl}/images/user.svg`,
    nickname: '未定义',
    workCount: 0,
    registerCount: 0,
    monitorCount: 0,
    age: 73,
    residence: '未定义',
    jobTitle: '未定义',
    workplace: '未定义',
    self_introduction: '这里放一段话介绍你自己，能够帮助他人更快找到你哦',
    allimages:[],
    registerimages: [],
    monitorimages: [],
    notification: 0
  })
  user.save(err => {
    if(err) {
      res.send({
        code: 20000, 
        data: {
          status: false,
          message: "error while registering"
        }
      })
      logger.warnLog("error retrieve user information" + __filename + 'line 149' + err)
    } else {
      res.send({
        code: 20000,
        data: {
          status: true,
          message: "successfully registered",
          token: token
        }
      })
    }
  })
}

/**
 * judge whether an email existed
 * @param {email} req email of prepared
 * @param {exist} res whether exist
 * @param {func} next middleware
 */
async function whetherRegister(req, res, next) {
  const { email } = req.body
  console.log(req.body)
  try {
    const user = await User.findOne({mail: email})
    if(user) {
      res.send({
        code: 20000,
        data:{
          exist: true
        }
      })
    } else {
      res.send({
        code: 20000,
        data: {
          exist: false
        }
      })
    }
  } catch(err) {
    logger.warnLog("error in whetherRegister in line 196" + err)
    res.send({
      code: 20000,
      data: {
        exist: false
      }
    })
  }
}

/**
 * set information for users in editProfile page
 * @param {JSON} req information that the user what to save
 * @param {JSON} res whether the user successed 
 * @param {func} next middleware
 */
async function setInfo(req, res, next) {
  const {mail, nickname, age, residence, jobTitle, self_introduction} = req.body
  try {
    const result = await User.update({mail: mail},
                                  {$set: {nickname: nickname,
                                          age: age,
                                          residence: residence,
                                          jobTitle: jobTitle,
                                          self_introduction: self_introduction}})
    if(result) {
      res.send({
        code: 20000,
        data: {
          update: true
        }
      })
    }
  } catch (err) {
    logger.warnLog('error while updating user' + err)
    res.send({
      code: 20000,
      data: {
        update: false
      }
    })
  }
}

/**
 * handle user upload avatar
 * @param {mail, file} req mail and the avatar of user
 * @param {Boolean} res whether upload avatar succeeded or not
 * @param {func} next middleware
 */
async function handleUpload(req, res, next) {
  const { mail } = req.body
  const imgUrl = `${config.serverUrl}/images/${req.file.filename}`
  try {
    if(req.file) {
      const result = await User.updateOne({mail: mail},
                                          {$set: {avatar: imgUrl}})
      if(result) {
        res.send({
          code: 20000,
          data: {
            upload: true
          }
        })
      } else {
        res.send({
          code: 20000,
          data: {
            upload: false
          }
        })
      }
    }
  } catch(err) {
    logger.warnLog('error while saving avatar image' + err)
    res.send({
      code: 20000,
      data: {
        upload: false,
      }
    })
  }
}

async function multiUpload(req, res, next) {
  const { mail } = req.body
  
  try {
    const {arr, infoArr} = await multiUploadInner(req.files, mail)
    const user = await User.findOne({'mail': mail})
    arr.forEach(img => {
      user.allimages.push(img)
    })
    const result = await user.save()
    if(result) {
      res.send({
        code: 20000,
        data: {
          upload: true,
          imageInfos: infoArr
        }
      })
    } else {
      res.send({
        code: 20000,
        data: {
          upload: false,
        }
      })
    }
  } catch(err) {
    logger.warnLog('error in multiUpload' + err)
    res.send({
      code: 20000,
      data: {
        upload: false
      }
    })
  }
}

function multiUploadInner(files, mail) {
  return new Promise((resolve, reject) => {
    const arr = []
    const infoArr = []
    let flag = 0
    const length = files.length
    files.forEach(async file => {
      let imgUrl = `${config.serverUrl}/images/${file.filename}`
      try {
        let user = await User.findOne({mail: mail})
        let hashArr  = await ipfs.add(fs.readFileSync(`${file.destination}/${file.filename}`))
        let hash = hashArr[0].hash
        let publicKey = user.publicKey
        let privateKey = user.privateKey
        let assetData = {
          img: {
            url: imgUrl,
            ipfs_hash: hash
          }
        }
        let metaData = {
          'transfer': 'earth'
        }
        let txCreateSimple = driver.Transaction.makeCreateTransaction(
          assetData,
          metaData,
  
          // A transaction needs an output
          [ driver.Transaction.makeOutput(
                  driver.Transaction.makeEd25519Condition(publicKey))
          ],
          publicKey
        )
        let txCreateSimpleSigned = driver.Transaction.signTransaction(txCreateSimple, privateKey)
        let otherInfo = await conn.postTransactionCommit(txCreateSimpleSigned)
        infoArr.push(otherInfo)
        let img = new Image({
          url: imgUrl,
          title: file.originalname,
          owner: mail,
          ipfs_hash: hash,
          otherInfo: otherInfo
        })
        let result = await img.save()
        arr.push(img)
        flag += 1
        if(flag === length) {
          resolve({'arr': arr, 'infoArr': infoArr})
        }
      } catch(err) {  
        logger.warnLog('error in multiUpload' + err)
        reject(err)
      }
      
    })
  })
}
module.exports = {
  login: login,
  getInfo: getInfo,
  register: register,
  whetherRegister: whetherRegister,
  setInfo: setInfo,
  handleUpload: handleUpload,
  multiUpload: multiUpload
}