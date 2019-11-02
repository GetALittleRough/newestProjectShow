<template>
  <section class="container message mt--300">
    <single-message
    :title="title"
    :imgurl="imgurl"
    :url="url"
    :date="date"
    :brief_intro="brief_intro"
    >
    </single-message>
    <single-message
    :title="title"
    :imgurl="imgurl"
    :url="url"
    :date="date"
    :brief_intro="brief_intro"
    >
    </single-message>
    <single-message
    :title="title"
    :imgurl="imgurl"
    :url="url"
    :date="date"
    :brief_intro="brief_intro"
    >
    </single-message>
  </section>
</template>
<script>
import SingleMessage from './singleMessage.vue';

export default {
  components: {
    SingleMessage
  },
  data() {
    return {
      title: "当当无“狗血”只有书香",
      imgurl: "/img/theme/img-1-1200x1000.jpg",
      url: "article",
      date: "2019-10-25 14:44:05",
      brief_intro: "10月23日深夜，互联网上迎来了今年最大的“瓜”。李国庆和俞渝在社交媒体上互撕的剧情，迅速登上各大热搜，成为网友热..."
    }
  }
}
</script>
<style lang="scss" scoped>
.message {
  .message-wrapper {
    padding: 2rem;
    border-radius: .25rem;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    .image-wrapper {
      .message-image {
        width: 30%;
        float: right;
      }
    }
  }
}

</style>