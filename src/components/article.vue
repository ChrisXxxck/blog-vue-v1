<template>
    <div class="sales-board">
      <div  v-for="(article,index) in articleList" class="sales-board-intro" @click="toArticleDetail(article)">
        <h2>{{article.title}}</h2>
        <p> <span v-html="article.displayText"></span></p>
        <button class="Button ContentItem-more Button--plain" type="button" @click.stop="toggleContent(index,article)">{{article.buttonText}}<svg viewBox="0 0 10 6" v-bind:class="{active:article.isActive}" class="Icon ContentItem-arrowIcon Icon--arrow" width="10" height="16" aria-hidden="true" style="height: 16px; width: 10px;"><title></title><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg></button>
      </div>
    </div>
</template>

<script>
  export default {
    props:['articles'],
    data () {
      return {
        articleList:[]
      }
    },
    watch: {
      articles() {
        this.articleList = this.articles
      }
    },
    created(){
      this.articleList = this.articles
    },
    methods:{
      toggleContent(index,article) {
        console.log(index)
        article.isActive = !article.isActive;
        article.displayText = article.isActive?article.content:article.abstract;
        article.buttonText =  article.isActive?'收起':'阅读全文'
        this.articleList.splice(index,article)
        console.log(this.articleList)
      },
      toArticleDetail (article) {
        console.log(article)
        this.$router.push({ path: `/article/${article.id}` })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sales-board {
    background: #f0f2f5;
  }
   .Button--plain {
    height: auto;
    padding: 0;
    line-height: inherit;
    background-color: transparent;
    border: none;
    border-radius: 0;
  }
  .Icon {
    vertical-align: text-bottom;
    fill: currentColor;
  }
  .ContentItem-arrowIcon.active {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .ContentItem-arrowIcon {
    width: 9px;
    margin-left: 8px;
  }
  .Button {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    background: none;
  }

  .ContentItem-more {
    padding: 0;
    margin-left: 4px;
    color: #175199;
    position: relative;
    left: 90%;
  }
  .sales-board-intro{
    margin-bottom: 10px;
    background: #fff;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    box-sizing: border-box;
    padding: 16px 20px;
    cursor: pointer;
  }
  .sales-board-intro:hover {
    margin-left: -4px;
    background-color: #fafff8;
    border-left:5px solid #81c53f;
  }
  .sales-board-intro h2 {
    font-size: 20px;
    padding: 10px 20px;
  }
  .sales-board-intro p {
    background: #f7fcff;
    padding: 0px 20px;
    color: #999;
    line-height: 1.8;
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
  .view-button{
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 5px 5px;
    cursor: pointer;
    margin-left: 85%;
    margin-bottom: 10px;
  }
</style>
