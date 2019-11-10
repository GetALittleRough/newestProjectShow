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
    console.log(this.$route.params)
  }
}
</script>