<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <!-- <template>
                            <div class="text-muted text-center mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/github.svg">
                                    Github
                                </base-button>

                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div>
                        </template> -->
                        <template>
                            <!-- <div class="text-center text-muted mb-4">
                                <small>Or sign up with credentials</small>
                            </div> -->
                            <form role="form"
                                  ref="registerForm"
                                  :model="registerForm">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="昵称（中英文皆可）"
                                            addon-left-icon="ni ni-circle-08"
                                            v-model="registerForm.username">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="邮箱"
                                            addon-left-icon="ni ni-email-83"
                                            v-model="registerForm.mail">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="密码"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="registerForm.password">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="重复密码"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="registerForm.repeatPassword">
                                </base-input>
                                <base-input alternative
                                            type="text"
                                            placeholder="验证码"
                                            addon-left-icon="ni ni-notification-70"
                                            v-model="registerForm.verification">
                                
                                </base-input>
                                <base-identify 
                                    @click.native="newCode()"
                                    :identifyCode="identifyCode"></base-identify>
                                <!-- <div class="text-muted font-italic">
                                    <small>password strength:
                                        <span class="text-success font-weight-700">strong</span>
                                    </small>
                                </div> -->
                                <base-checkbox>
                                    <span>我同意
                                        <a href="#">隐私政策</a>
                                    </span>
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click.native.prevent="createAccount()">创建账户</base-button>
                                    <base-button type="success" class="my-4" @click="goBack()">返回</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import BaseIdentify  from '../components/BaseIdentify.vue'
export default {
    components: {
        BaseIdentify
    },
    computed: {
        identifyCode: {
            get: function() {
                return this.code
            },
            set: function() {
                this.code = this.refreshCode()
            }
            
        }
    },
    data() {
        return {
            code: this.refreshCode(4),
            registerForm: {
                username: '',
                mail: '',
                password: '',
                repeatPassword: '',
                verification: ''
            }
        }
    },
    methods: {
        refreshCode(length) {
            let randomNum = 0
            while(randomNum < Math.pow(10, length - 1)) {
                randomNum = Math.floor(Math.random() * Math.pow(10, length))
            }
            return randomNum.toString()
        },
        newCode() {
            this.code = this.refreshCode(4)
        },
        goBack() {
            this.$router.go(-1)
        },
        createAccount() {
            console.log(this.registerForm)
        }
    }
};
</script>
<style>
</style>
