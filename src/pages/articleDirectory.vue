<template>
  <div class="detail-wrap">
    <div class="detail-left">
      <div class="product-board">
        <img :src="productIcon">
        <ul>
          <li v-for="(item,index) in categoryList" :class="{active:item.isActive}" @click="changeCategory(index,item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="detail-right">
      <article-comp v-bind:articles="articleList">
      </article-comp>
    </div>
  </div>
</template>

<script>
    import Article from '../components/article'
    export default {
      created: function () {
        this.$http.get('/api/articles/getCategoriesByParentId',{params:{id:this.$route.query.id}})
          .then((res) => {
            this.categoryList = res.body
            for (let i=0;i<this.categoryList.length;i++){
              this.categoryList[i].isActive = false;
              this.categoryList[0].isActive = true;
            }
            this.$http.post('/api/articles/getArticlesByCategory',{id:this.categoryList[0].id,type:1},{emulateJSON:true}).then( (res) => {
              this.articleList = res.data;
              for (let i=0;i<this.articleList.length; i++){
                this.articleList[i].displayText =  this.articleList[i].abstract;
                this.articleList[i].buttonText = '阅读全文'
                this.articleList[i].isActive = false
              }
            } ,function (err) {
              console.log(err)
            })
          },function (err) {
            console.log(err)
          });
      },
      components:{
        ArticleComp:Article,
      },
      name: "article-directory",
      data () {
        return {
          categoryList: [],
          imgMap: {
            '/articles/java': require("../assets/images/1.png"),
            '/articles/bigData': require("../assets/images/3.png"),
            '/articles/linux': require("../assets/images/2.png"),
            '/articles/frontEnd': require("../assets/images/4.png")
          },
          articleList:[],
        }
      },

      computed: {
        productIcon () {
          // console.log(this.$route.path)
          return this.imgMap[this.$route.path]
        }
    },
      watch: {
        '$route' (to, from) {
          if (to.query.id){
            this.$http.get('/api/articles/getCategoriesByParentId',{params:{id:this.$route.query.id}})
              .then((res) => {
                this.categoryList = res.body
                for (let i=0;i<this.categoryList.length;i++){
                  this.categoryList[i].active = false
                }
              },function (err) {
                console.log(err)
              });
          }
        }
      },
      methods:{
        changeCategory (index,item) {
          console.log(item)
          for (let i=0;i<this.categoryList.length;i++){
            if (this.categoryList[i].isActive == true){
              let category = this.categoryList[i];
              category.isActive = false;
              this.categoryList.splice(i,category);
            }
          }
          item.isActive = true;
          this.categoryList.splice(index,item);
          this.$http.post('/api/articles/getArticlesByCategory',{id:item.id,type:1},{emulateJSON:true}).then( (res) => {
            // console.log(res.data)
            this.articleList = res.data;
            for (let i=0;i<this.articleList.length; i++){
              this.articleList[i].displayText =  this.articleList[i].abstract;
              this.articleList[i].buttonText = '阅读全文'
              this.articleList[i].isActive = false
            }
          } ,function (err) {
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>
  .detail-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }
  .detail-left {
    float: left;
    width: 200px;
    text-align: center;
  }
  .detail-right {
    float: left;
    width: 980px;
    margin-left: 20px;
  }
  .product-board {
    background: #fff;
    padding: 20px 0;
  }
  .product-board ul {
    margin-top: 20px;
  }
  .product-board li {
    text-align: left;
    padding: 10px 15px;
    cursor: pointer;
  }
  .product-board li.active,
  .product-board li:hover {
    background: #4fc08d;
    color: #fff;
  }
  .product-board li a {
    display: block;
  }
  .sales-board {
    background: #fff;
  }
  .sales-board-form {

  }
  .sales-board-intro h2 {
    font-size: 20px;
    padding: 20px;
  }
  .sales-board-intro p {
    background: #f7fcff;
    padding: 10px 20px;
    color: #999;
    line-height: 1.8;
  }
  .sales-board-form {
    padding: 30px 20px;
    font-size: 14px;
  }
  .sales-board-line {
    clear: both;
    padding-bottom: 20px;
  }
  .sales-board-line-left {
    display: inline-block;
    width: 100px;
  }
  .sales-board-line-right {
    display: inline-block;
    width: 75%;
  }
  .sales-board-des {
    border-top: 20px solid #f0f2f5;
    padding: 15px 20px;
  }
  .sales-board-des p {
    line-height: 1.6;
  }
  .sales-board-des h2 {
    font-size: 20px;
    padding-bottom: 15px;
  }
  .sales-board-des h3 {
    font-size: 18px;
    font-weight: bold;
    padding: 20px 0 10px 0;
  }
  .sales-board-des li {
    padding: 5px 0;
  }
  .sales-board-table {
    width: 100%;
    margin-top: 20px;
  }
  .sales-board-table th {
    background: #4fc08d;
    color: #fff;
  }
  .sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
  }
</style>
