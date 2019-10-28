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
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="昵称（中英文皆可）"
                                            addon-left-icon="ni ni-circle-08">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="邮箱"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="密码"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-input alternative
                                            type="repeat-password"
                                            placeholder="重复密码"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-identify></base-identify>
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
                                    <base-button type="primary" class="my-4">创建账户</base-button>
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
import { BaseIdentify } from '../components/BaseIdentify'
export default {
    components: {
        BaseIdentify
    }
};
</script>
<style>
</style>
