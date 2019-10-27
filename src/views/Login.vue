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
                                <small>Or sign in with credentials</small>
                            </div> -->
                            <form
                             role="form"
                             ref="loginForm"
                             :model="loginForm"
                             :rules="loginRules"
                             class="login-form"
                             >
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-email-83"
                                            ref="username"
                                            v-model="loginForm.username"
                                            name="username">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="密码"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            :key="passwordType"
                                            v-model="loginForm.password"
                                            @keyup.enter.native="handleLogin">
                                </base-input>
                                <base-checkbox>
                                    记住这台电脑
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click.native.prevent="handleLogin">登录</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>忘记密码？</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="#" class="text-light">
                                <small>创建新的账户</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入正确的用户名！'))
            } else {
                callback()
            }
            }
            const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能少于6个字符！'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            redirect: undefined,
            otherQuery: {}
        }
    },
    mounted() {

    },
    methods: {
        checkCapslock({ shiftKey, key } = {}) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                this.capsTooltip = true
                } else {
                this.capsTooltip = false
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        handleLogin() {
            this.$store.dispatch('user/login', this.loginForm)
            .then((data) => {
                if(data.login) {
                    this.$store.dispatch('user/getInfo')
                    .then(info => {
                        console.log(this.$store.getters.name)
                    })
                    this.$router.push({ path:'/', query: this.otherQuery })
                } else {
                    
                }
            })
            .catch((err) => {
                console.log(err)
                console.log('login failed')
                this.loading = false
            })
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        }
    }
};
</script>
<style>
</style>
