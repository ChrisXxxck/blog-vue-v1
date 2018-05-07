<template>
<div>
  <span v-html="article.content"></span>
</div>
</template>

<script>
    export default {
        name: "article-detail",
        created:function () {
          console.log(this.$route.params);
          this.$http.get('/api/articles/getArticleById',{params:{id:this.$route.params.id}})
            .then((res) => {
              console.log()
              this.article = res.body[0];
            },function (err) {
              console.log(err)
            })
        },
      data () {
          return {
            article:{}
          }
      },
      watch: {
        '$route' (to, from) {
          console.log('rou'+this.$route.params.id);
          this.$http.get('/api/articles/getArticleById',{params:{id:this.$route.params.id}})
            .then((res) => {
              console.log(res.body)
              this.article = res.body[0];
            },function (err) {
              console.log(err)
            })
        }
      },
    }
</script>

<style scoped>

</style>
