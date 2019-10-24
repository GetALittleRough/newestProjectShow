<template>
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
                              <base-button type="info" size="sm" class="mr-4" @click="toMessages()"><i class="ni ni-chat-round" ></i> 消息通知 <badge type="default">{{ notification }}</badge></base-button>
                              <base-button type="default" size="sm" class="float-right" @click="editProfile()"><i class="ni ni-settings"></i>个人设置 <badge type="white">1</badge></base-button>
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
          
          <div class="text-center mt-10 justify-content-center">
            <tabs>
              <tab-pane title="作品集">
                <transition name="fade">
                  <div class="row">
                      <div class="collections col-6" v-for="(img,index) in pages" v-bind:key="index">
                        <img v-bind:src="img" alt="index" class="collection-image">
                      </div>
                  </div>
                </transition>
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
            <!-- <nav aria-label="Page navigation" class="pagination-nav">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">
                    <i class="fa fa-angle-left"></i>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active">
                  <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    <i class="fa fa-angle-right"></i>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav> -->
            <base-pagination class="pagination-nav"
              :perPage="perPage"
              :total="images.length"
              :align="'center'"
              :value="currentPage"
              @input="changePage2"
              >
            </base-pagination>
          </div>
      </div>
  </section>
</template>
<script>
import Tabs from '../../components/Tabs/Tabs'
import TabPane from '../../components/Tabs/TabPane'
import { FadeTransition } from "vue2-transitions";
import { BasePagination } from '../../components/BasePagination';
export default {
  components: {
    Tabs,
    TabPane,
    FadeTransition
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
    this.right = this.images.length > this.perPage? this.perPage: this.images.length;
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
          'img/theme/img-1-1200x1000.jpg',
          'img/theme/img-2-1200x1000.jpg',
          'img/theme/team-1-800x800.jpg',
          'img/theme/team-2-800x800.jpg',
          'img/theme/team-3-800x800.jpg',
          'img/theme/team-4-800x800.jpg',
          'img/theme/img-1-1200x1000.jpg',
          'img/theme/img-2-1200x1000.jpg',
          'img/theme/img-2-1200x1000.jpg',
      ],
      notification: 4,
      perPage: 4,
      left: 0,
      right: 0,
      currentPage: 1
    }
  },
  methods: {
    editProfile: function() {
      this.$router.push({path: '/profile/editprofile'})
    },
    toMessages: function() {
      this.$router.push({path: '/profile/messages'})
    },
    changePage2: function(value) {
      this.left = (value - 1) * this.perPage;
      this.right = value * this.perPage > this.images.length? this.images.length : value * this.perPage;
      this.currentPage = value
      // this.pages = this.images.slice(left, right)
    }
  },
  computed: {
    pages() {
      return this.images.slice(this.left, this.right)
    }
  }
}
</script>
<style scoped lang="scss">
.collection-image {
    width: 100%;
    margin-top: 5vh;
}
.pagination-nav {
  margin-top: 5vh;
}
</style>
