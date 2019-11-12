<template>
  <div class="container mt--300">
    <card>
      <template v-slot:header>
        <div class="text-center">
          <h3>编辑图片</h3>
        </div>
        </template>
      <div class="container">
        <div class="row justify-content-center">
          <img :src="url" alt="" class="image">
        </div>
        <div class="row justify-content-center info">
          <image-detail v-for="(info,index) in imageInfo" :key="index" :tableData="info"></image-detail>
        </div>

        <div class="row justify-content-center transfer">
          <div class="col-lg-5">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
              <template>
                <form
                  role="form"
                  ref="loginForm"
                  :model="loginForm"
                  :rules="loginRules"
                  class="login-form"
                  >
                  <base-input alternative
                              class="mb-3"
                              placeholder="请输入您的公钥"
                              addon-left-icon="ni ni-lock-circle-open"
                              ref="publicKey"
                              v-model="loginForm.publicKey"
                              name="publicKey">
                  </base-input>
                  <p class="mailHint" v-if="mailHint">请输入正确的公钥</p>
                  <base-input alternative
                              type="password"
                              placeholder="请输入您的私钥"
                              ref="privateKey"
                              name="privateKey"
                              addon-left-icon="ni ni-lock-circle-open"
                              :key="passwordType"
                              v-model="loginForm.privateKey"
                              @keyup.enter.native="handleLogin">
                  </base-input>
                  <p class="mailHint" v-if="privateKeyHint">请输入正确的私钥</p>
                  <base-input alternative
                              type="password"
                              placeholder="请再次输入您的私钥"
                              addon-left-icon="ni ni-lock-circle-open"
                              ref="privateKeyReenter"
                              name="privateKeyReenter"
                              v-model="loginForm.passwordReenter"
                              @keyup.enter.native="handleLogin">
                  </base-input>
                  <p class="mailHint" v-if="repeatKeyHint">请保证两次输入的私钥相同！</p>
                  <base-input alternative
                              type="text"
                              placeholder="请输入对方公钥地址"
                              addon-left-icon="ni ni-notification-70"
                              v-model="loginForm.target">
                  
                  </base-input>
                  <p class="mailHint" v-if="targetAddressHint">请输入正确的公钥地址！</p>
                  <base-input alternative
                              type="text"
                              placeholder="验证码"
                              addon-left-icon="ni ni-notification-70"
                              v-model="loginForm.verification">
                  
                  </base-input>
                  <p class="mailHint" v-if="verificationHint">请输入正确的验证码！</p>
                  <base-identify 
                      @click.native="newCode()"
                      :identifyCode="identifyCode"></base-identify>
                  
                  <div class="text-center">
                      <base-button type="primary" class="my-4" @click.native.prevent="transfer">确认</base-button>
                  </div>
                </form>
              </template>
            </card>
          </div>
        </div>
      </div>
      <!-- <template v-slot:footer>
        <div class="text-center">
          <base-button type="primary" @click="transfer">转让</base-button>
        </div>
      </template> -->
    </card>
  </div>
  
</template>
<script>
import BaseIdentify from '../../components/BaseIdentify'
import Card from '../../components/Card'
import { getImage, transferImage } from '../../api/user'
import ImageDetail from '../components/imageDetail'
export default {
  components: {
    Card,
    ImageDetail,
    BaseIdentify
  },
  methods: {
    newCode() {
        this.code = this.refreshCode(4)
    },
    refreshCode(length) {
      let randomNum = 0
      while(randomNum < Math.pow(10, length - 1)) {
          randomNum = Math.floor(Math.random() * Math.pow(10, length))
      }
      return randomNum.toString()
    },
    validatePublic: function(rule, value, callback) {
      if(!value) {
        return callback(new Error('输入信息不能为空！'))
      }
    },
    validatePrivate: function(rule, value, callback) {
      if(!value) {
        this.$message.error('输入信息不能为空')
      }
    },
    transfer() {
      
      if(!this.mailHint && !this.veriHint && !this.privateKeyHint && !this.repeatKeyHint && !this.targetAddressHint && !this.verificationHint) {
        
      } else {
        this.$message.error('请完善表格！')
      }
    },
  },
  data() {
    return {
      url: '',
      imageInfo: [],
      loginForm: {
        publicKey: '',
        privateKey: '',
        verification: '',
        passwordReenter: '',
        target: ''
      },
      code: this.refreshCode(4),
      loginRules: {
        publicKey: [{ required: true, trigger: 'blur', validator: this.validatePublic }],
        privateKey: [{ required: true, trigger: 'blur', validator: this.validatePrivate }],
        privateKeyReenter: [{ required: true, trigger: 'blur', validator: this.validatePrivate }]
      },
      mailHint: true,
      hint: '',
      verificationHint: false,
      veriHint: '',
      passwordType: 'password',
      privateKeyHint: false,
      repeatKeyHint: false,
      targetAddressHint: false,
      imageObj: Object
    }
  },
  computed: {
    identifyCode: {
      get: function() {
        return this.code
      },
      set: function() {
        this.code = this.refreshCode(4)
      }
    }
  },
  watch: {
    loginForm: {
      deep: true,
      handler(newValue, oldValue) {
        if(newValue.publicKey.length != 44) {
          this.mailHint = true
        } else {
          this.mailHint = false
        }
        if(newValue.privateKey.length != 44) {
          this.privateKeyHint = true
        } else {
          this.privateKeyHint = false
        }
        if(newValue.target.length != 44) {
          this.targetAddressHint = true
        } else {
          this.targetAddressHint = false
        }
        if(newValue.passwordReenter !== newValue.privateKey) {
          this.repeatKeyHint = true
        } else {
          this.repeatKeyHint = false
        }
        if(newValue.verification !== this.code) {
          this.verificationHint = true
        } else {
          this.verificationHint = false
        }
      }
    }
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    const token = this.$store.getters.token
    const id = this.$route.params.id
    const mail = info.mail
    const reqData = {
      token: token,
      mail: mail,
      id: id
    }
    getImage(reqData).then(res => {
      if(!res.data.whetherImage) {
        this.$message.error(res.data.message)
      } else {
        const image = res.data.imageObj
        this.imageObj = res.data.imageObj
        this.url = image.url
        this.imageInfo.push([
          {
            name: '图像ID',
            value: image.otherInfo.id
          },{
            name: '图像名称',
            value: image.title
          }, {
            name: 'ipfs哈希值',
            value: image.ipfs_hash
          }, {
            name: '拥有者',
            value: image.owner
          }, {
            name: '区块链Transaction ID',
            value: image.otherInfo.id
          }, {
            name: '交易类型',
            value: image.otherInfo.operation
          }
        ])
      }
    })
  }
}
</script>
<style scoped>
.image {
  width: 90%;
}
.info {
  margin-top: 5vh;
  width: 90%;
  margin-left: 5%;
}
.usedName {
    font-size: 0.5em;
    margin: 0 auto;
    color: #f5365c;
}
.mailHint {
    font-size: 0.8em;
    margin: 0 auto;
    color: #f5365c;
}
.transfer {
  margin-top: 5vh;
}
</style>