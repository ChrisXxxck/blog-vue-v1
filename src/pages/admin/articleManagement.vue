<template>
  <div class="article">
    <div class="main-crumbs">
      我的文章
      <button @click="editArticle" class="btn-default">写文章</button>
    </div>
    <div class="main-nav-tabs">
      <ul class="nav">
        <li class="nav-item" :class="{ 'nav-item-active': choosed == 1}"  @click="getPublishedArticles">
          <a class="nav-link">已发表</a>
        </li>
        <li class="nav-item" :class="{ 'nav-item-active': choosed == 2}" @click="getSavedArticles">
          <a class="nav-link">草稿箱</a>
        </li>
        <li class="nav-item" :class="{ 'nav-item-active': choosed == 3}" @click="getDeletedArticles">
          <a class="nav-link">回收站</a>
        </li>
      </ul>
    </div>
    <div class="articles">
      <article-comp v-bind:articles="articleList">
      </article-comp>
    </div>
  </div>
</template>

<script>
    import Article from '../../components/admin/article'
    export default {
        name: "article-management",
        created: function () {
          this.$http.get('/api/articles/getAllArticles')
            .then((res) => {
              console.log(res.body)
              this.articleList = res.body
              for (let i=0;i<this.articleList.length; i++){
                this.articleList[i].displayText =  this.articleList[i].abstract;
                this.articleList[i].buttonText = '阅读全文'
                this.articleList[i].isActive = false
              }
            },function (err) {
              console.log(err)
            });
        },
        components:{
          ArticleComp:Article,
        },
      data () {
          return {
            articleList:[],
            choosed:1,
          }
      },
      methods:{
        editArticle () {
          // var id=65;
          // this.$router.push({ path: `article/edit/${id}`});
          this.$router.push({ path: `article/edit`});
        },
        getPublishedArticles () {
          this.choosed = 1;
          this.$http.get('/api/articles/getAllArticles')
            .then((res) => {
              console.log(res.body)
              this.articleList = res.body
              for (let i=0;i<this.articleList.length; i++){
                this.articleList[i].displayText =  this.articleList[i].abstract;
                this.articleList[i].buttonText = '阅读全文'
                this.articleList[i].isActive = false
              }
            },function (err) {
              console.log(err)
            });
        },
        getSavedArticles () {
          this.choosed = 2;
          this.$http.get('/api/articles/getSavedArticles')
            .then((res) => {
              console.log(res.body)
              this.articleList = res.body
              for (let i=0;i<this.articleList.length; i++){
                this.articleList[i].displayText =  this.articleList[i].abstract;
                this.articleList[i].buttonText = '阅读全文'
                this.articleList[i].isActive = false
              }
            },function (err) {
              console.log(err)
            });
        },
        getDeletedArticles () {
          this.choosed = 3;
          this.$http.get('/api/articles/getDeletedArticles')
            .then((res) => {
              console.log(res.body)
              this.articleList = res.body
              for (let i=0;i<this.articleList.length; i++){
                this.articleList[i].displayText =  this.articleList[i].abstract;
                this.articleList[i].buttonText = '阅读全文'
                this.articleList[i].isActive = false
              }
            },function (err) {
              console.log(err)
            });
        }
      },
      watch: {
        '$route' (to, from) {
          this.$http.get('/api/articles/getAllArticles')
            .then((res) => {
              this.choosed = 1;
              console.log(res.body)
              this.articleList = res.body
              for (let i=0;i<this.articleList.length; i++){
                this.articleList[i].displayText =  this.articleList[i].abstract;
                this.articleList[i].buttonText = '阅读全文'
                this.articleList[i].isActive = false
              }
            },function (err) {
              console.log(err)
            });
        }
      },
    }
</script>

<style scoped>
.article{
}
.main-crumbs {
  color: #999;
  font-size: 1rem;
  padding-left: 0.375rem;
  padding-bottom: 24px;
  height: 40px;
  vertical-align: top;
}
.main-crumbs button{
  position: relative;
  left: 75%;
  top: 1px;
}
.btn-default{
  width: 80px;
  height: 35px;
  background-color: #009a61;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
}

.btn-default:hover{
  background-color: #004D31;
}
.main-crumbs::before {
  margin-left: -6px;
  margin-right: 8px;
  content: '';
  display: inline-block;
  height: 16px;
  width: 3px;
  background-color: #009a61;
  vertical-align: -2px;
}
.main-nav-tabs{
  border-bottom: 1px solid #e9e9e9;
}
.nav {
  color: #999;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav-item{
  margin-right: 30px;
  padding-bottom: 24px;
  font-size: 0.875rem;
  cursor: pointer;
}
.nav-link{

  transition: color 0.3s ease-in;
  display: block;
}
.nav-link:hover{
  color: #4f4f4f;
}
.nav-item-active{
  border-bottom: 3px solid #009a61;
  color: #4f4f4f !important;
}
.articles{
  margin-top: 20px;
}
</style>
