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
                <div class="col-md-6">{{ id }}</div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">账户类型</div>
                <div class="col-md-6">{{ accountType }}</div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">昵称</div>
                <div class="col-md-6" v-if="!changeName">{{ nickname }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="nickname" v-if="changeName" v-model="nickname">
                <div class="col-md-3"> <base-button type="primary" @click="changeNickname()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">注册时间</div>
                <div class="col-md-6">{{ new Date() }}</div>
               
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
      id: 'crsong@bupt.edu.cn',
      accountType: '个人账户',
      nickname: 'Hypercool的开发者',
      changeName: false
    }
  },
  methods: {
    changeNickname: function() {
      if(this.changeName === true) {
        
      }
      this.changeName = !this.changeName
    },
    save: function() {
      
    },
    goback: function() {
      this.$router.go(-1)
    }
  }
}
</script>