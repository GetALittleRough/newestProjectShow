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
      </div>
      <template v-slot:footer>
        <div class="text-center">
          <base-button type="primary">转让</base-button>
        </div>
      </template>
    </card>
  </div>
  
</template>
<script>
import Card from '../../components/Card'
import { getImage } from '../../api/user'
import ImageDetail from '../components/imageDetail'
export default {
  components: {
    Card,
    ImageDetail
  },
  data() {
    return {
      url: '',
      imageInfo: []
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
</style>