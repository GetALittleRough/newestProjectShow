<template>
  <div class="container">
    <div class="row message-wrapper">
      <div class="thumbnail-wrapper col-md-3">
        <img :src="imgurl" alt="" class="thumbnail">
      </div>
      <div class="message-content col-md-9">
        <a :href="url"><h4>{{ title }}</h4></a>
        <p class="brief-introduction">{{ brief_intro }}</p>
        <div class="public-time">
          <span ><i class="ni ni-watch-time"></i></span>
          <p class="date">{{date}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgurl: String,
    url: String,
    date: String,
    title: String,
    brief_intro: String
  }
}
</script>
<style lang="scss" scoped>
.date {
  display: inline-block;
}
.thumbnail {
  width: 100%;
  height: 13vh;
  margin-top: 1vh;
}
.message-wrapper {
  background: #fff;
  border-bottom: 1px solid rgb(201, 199, 199);
  padding: 15px;
}
</style>