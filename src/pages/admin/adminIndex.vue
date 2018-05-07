<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="sidebar">
        <p class="centered">
          <img src="../../assets/images/head-img.png" class="img-circle" width="60">
        </p>
        <h5 class="centered">Chris</h5>
        <ul class="widget widget-menu unstyled">
          <router-link  :to="{path: 'articles'}" tag="li" active-class="active">我的文章</router-link>
          <router-link :to="{path: 'courses'}" tag="li" active-class="active">我的课程</router-link>
          <router-link  :to="{path: 'categories'}" tag="li" active-class="active">文章目录</router-link>
          <router-link  :to="{path: 'comments'}" tag="li" active-class="active">网站评论</router-link>
          <router-link  :to="{path: 'about'}" tag="li" active-class="active">我的主页</router-link>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
    export default {
        name: "admin-index"
    }
</script>

<style scoped>
  .sidebar{
    background-color: #424a5d;
    padding-top: 20px;
    border-radius: 6px;
    margin-right: 40px;
  }
  .sidebar h5 {
    color: #f2f2f2;
    font-weight: 700;
  }
  .img-circle {
    border-radius: 50%;
  }
  .index-wrap {
    font-size: 13px;
    font-family: 'Open Sans', Arial, sans-serif;
    color: #aeb2b7;
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding: 20px 0px;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }
  .index-right {
    float: left;
    width: 900px;
  }
  .centered {
    text-align: center;
    margin-bottom: 10px;
  }
  /*ul{*/
    /*margin: 0 0 10px 25px;*/
  /*}*/
  ul li{
    height: 50px;
    /*background-color: #2d2b32;*/
    line-height: 50px;
    border-bottom: 1px;
    padding-left: 25px;
    cursor: pointer;
  }
  ul li:hover{
    color: #ffffff;
    background-color: rgb(23, 36, 52);
  }
  .widget-menu>li+li {
    border-top: 1px solid #555;
  }
  .widget{
    overflow: hidden;
  }
</style>
