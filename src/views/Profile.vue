<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-bind:v-lazy="avatar" class="rounded-circle" v-bind:src="avatar">
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <base-button type="info" size="sm" class="mr-4">通知</base-button>
                                    <base-button type="default" size="sm" class="float-right">联系作者</base-button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">{{ workCount }}</span>
                                        <span class="description">作品数量</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{ registerCount }}</span>
                                        <span class="description">已登记作品数量</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{ monitorCount }}</span>
                                        <span class="description">正在监测作品</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <h3>{{ name }}
                                <span class="font-weight-light">, {{ age }} 岁</span>
                            </h3>
                            <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{ residence }}</div>
                            <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>{{ jobTitle }}</div>
                            <div><i class="ni education_hat mr-2"></i>{{ workplace }}</div>
                        </div>
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <p>{{ self_introduction }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
                
                <div class="text-center mt-10">
                  <tabs>
                    <tab-pane title="作品集">
                        <div class="row">
                            <div class="collections col-6" v-for="(img,index) in images" v-bind:key="index">
                                <img v-bind:src="img" alt="index" class="collection-image">
                            </div>
                        </div>
                    </tab-pane>
                    <tab-pane title="登记作品">
                        <div>
                            <p>this is fucking amusing2.</p>
                        </div>
                    </tab-pane>
                    <tab-pane title="监测作品">
                        <div>
                            <p>this is fucking amusing3.</p>
                        </div>
                    </tab-pane>
                  </tabs>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import Tabs from '../components/Tabs/Tabs'
import TabPane from '../components/Tabs/TabPane'
export default {
  components: {
    Tabs,
    TabPane
  },
  created: function() {
    this.workCount = 10
    this.registerCount = 5
    this.monitorCount = 8
    this.name = '小明'
    this.age = 27
    this.residence = '北京'
    this.jobTitle = '自由摄影师'
    this.workplace = 'Hypercool视觉研究院'
    this.self_introduction = '大家好，我是一名自由摄影师小明，很高兴能认识大家，希望大家能够喜欢我的作品'
    this.avatar = 'img/theme/team-4-800x800.jpg'
  },

  data() {
    return {
      workCount: 10,
      registerCount: 5, 
      monitorCount: 8,
      name: '小明',
      age: 27, 
      residence: '北京',
      jobTitle: '自由摄影师',
      workplace: 'Hypercool视觉研究院',
      self_introduction: '大家好，我是一名自由摄影师小明，很高兴能认识大家，希望大家能够喜欢我的作品',
      avatar: 'img/theme/team-4-800x800.jpg',
      images: [
          'img/theme/team-1-800x800.jpg',
          'img/theme/team-2-800x800.jpg',
          'img/theme/team-3-800x800.jpg',
          'img/theme/team-4-800x800.jpg',
      ]
    }
  }
};
</script>
<style scoped lang="scss">
.collection-image {
    width: 100%;
    margin-top: 5vh;
}
</style>
