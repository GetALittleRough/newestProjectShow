<template>
  <div class="container">
    <card>
      <template v-slot:header>
        <div class="text-center">
          <h3>编辑图片</h3>
        </div>
        </template>
      <div class="container">
        <img src="" alt="" class="image">
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

export default {
  components: {
    Card
  },
  data() {
    return {
      url: ''
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
    console.log(reqData)
    getImage(reqData).then(res => {
      if(!res.data.whetherImage) {
        this.$message.error(res.data.message)
      } else {
        console.log('fd')
      }
    })
  }
}
</script>