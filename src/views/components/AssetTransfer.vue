<template>
  <div class="container mt--400">
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
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
                            ref="username"
                            v-model="loginForm.username"
                            name="username">
                </base-input>
                <p class="mailHint" v-if="mailHint">{{ hint }}</p>
                <base-input alternative
                            type="password"
                            placeholder="请输入您的私钥"
                            addon-left-icon="ni ni-lock-circle-open"
                            :key="passwordType"
                            v-model="loginForm.password"
                            @keyup.enter.native="handleLogin">
                </base-input>
                <base-input alternative
                            type="password"
                            placeholder="请再次输入您的私钥"
                            addon-left-icon="ni ni-lock-circle-open"
                            :key="passwordType"
                            v-model="loginForm.password"
                            @keyup.enter.native="handleLogin">
                </base-input>
                <base-input alternative
                            type="text"
                            placeholder="验证码"
                            addon-left-icon="ni ni-notification-70"
                            v-model="loginForm.verification">
                
                </base-input>
                <p class="mailHint" v-if="verificationHint">{{veriHint}}</p>
                <base-identify 
                    @click.native="newCode()"
                    :identifyCode="identifyCode"></base-identify>
                <base-checkbox>
                    记住这台电脑
                </base-checkbox>
                <div class="text-center">
                    <base-button type="primary" class="my-4" @click.native.prevent="handleLogin">登录</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        verification: ''
      }
    }
  }
}
</script>
<style scoped>
.mt--300 {
  margin-top: -600px;
}
</style>