<template>
  <div class="container">
    <card shadow class="card-profile mt--300">
      <template v-slot:header>
        <div class="row justify-content-center">
          <h3>个人信息</h3>
        </div>
      </template>
      <div class="row justify-content-md-center">
        <!-- <div class="col-md-3 text-center">
          <div>用户ID</div>
          <span>账户类型</span>
          <span>昵称</span>
          <span>注册时间</span>
        </div>
        <div class="col-md-5 text-center">
          {{ id }}
        </div> -->
        <div class="col-md-6">
          <b-list-group>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">用户ID</div>
                <div class="col-md-6">{{ info.mail }}</div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">总作品数量</div>
                <div class="col-md-6">{{ info.workCount }}</div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">昵称</div>
                <div class="col-md-6" v-if="!changeName">{{ info.nickname }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.nickname" v-if="changeName" v-model="info.nickname">
                <div class="col-md-3"> <base-button type="primary" @click="changeNickname()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">年龄</div>
                <div class="col-md-6" v-if="!changeAge">{{ info.age }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.age" v-if="changeAge" v-model="info.age">
                <div class="col-md-3"> <base-button type="primary" @click="changeUserAge()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">居住地</div>
                <div class="col-md-6" v-if="!changeResidence">{{ info.residence }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.residence" v-if="changeResidence" v-model="info.residence">
                <div class="col-md-3"> <base-button type="primary" @click="changeUserResidence()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">职位</div>
                <div class="col-md-6" v-if="!changeJob">{{ info.jobTitle }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.age" v-if="changeJob" v-model="info.jobTitle">
                <div class="col-md-3"> <base-button type="primary" @click="changeUserJob()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">自我介绍</div>
                <div class="col-md-6" v-if="!changeIntro">{{ info.self_introduction }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.age" v-if="changeIntro" v-model="info.self_introduction">
                <div class="col-md-3"> <base-button type="primary" @click="changeUserIntro()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">注册时间</div>
                <div class="col-md-6">{{ info.date }}</div>
              </div>
            </b-list-group-item>
             <b-list-group-item>
              <div class="row">
                <div class="col-md-3">公钥</div>
                <div class="col-md-6">{{ info.publicKey }}</div>
              </div>
            </b-list-group-item>
             <b-list-group-item>
              <div class="row">
                <div class="col-md-3">私钥</div>
                <div class="col-md-6">{{ info.privateKey }}</div>
              </div>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <template v-slot:footer>
        <div class="row justify-content-center">
           <base-button type="success" @click="save()">保存</base-button>
           <base-button type="primary" @click="goback()">返回</base-button>
        </div>
      </template>
    </card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        mail: 'crsong@bupt.edu.cn',
        accountType: '个人账户',
        nickname: 'Hypercool的开发者',
        registerDate: new Date()
      },
      changeName: false,
      changeAge: false
    }
  },
  created() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.info = info
  },
  methods: {
    changeNickname: function() {
      if(this.changeName === true) {
        
      }
      this.changeName = !this.changeName
    },
    changeUserAge() {
      this.changeAge = !this.changeAge
    },
    save: function() {
      
    },
    goback: function() {
      this.$router.go(-1)
    }
  }
}
</script>