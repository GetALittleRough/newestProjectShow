<template>
  <div class="container mt--300 article">
    <card>
      <div v-html="content"></div>
    </card>
    
  </div>
</template>
<script>
import Card from '../../components/Card'
export default {
  components: {
    Card
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    info.articles.forEach(article => {
      if(article._id === this.$route.params.id) {
        this.content = article.content
      }
    })
  },
  props: {
    title: {
      type: String,
      description: 'The title of the article'
    },
    brief: String,
    date: Date,
    images: [Object],
    cover: String
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>
<style scoped>
.article-images {
  max-width: 90%;
  margin: 0 auto;
}
</style>