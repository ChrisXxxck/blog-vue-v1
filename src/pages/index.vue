<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>博客分类</h2>

        <template v-for="blog in categoryList">
          <h3>{{ blog.name}}</h3>
          <ul>
            <li v-for="item in blog.list">
              <!--<a :href="item.url">{{ item.name }}</a>-->
              <router-link :to="{path:'articles'+item.url,query:{id:item.id} }">{{item.name}}</router-link>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div v-if="!blog.last" class="hr"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新博客</h2>
        <ul>
          <li v-for="item in newsList">
            <a :href="item.url" class="new-item">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <slide-show :slides="slides" :inv="invTime"></slide-show>
      <div class="index-board-list">
        <div
          class="index-board-item"
          v-for="(item, index) in courseList"
          :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.img]">
          <div class="index-board-item-inner" >
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="index-board-button">
              <router-link class="button" :to="{path: 'course/' + item.url}">立即查看</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import slideShow from '../components/slideShow'
  export default {
      name: "index",
      components: {
        slideShow
      },
      created: function () {
        this.$http.get('/api/getCategoryList')
          .then((res) => {
            console.log(res.body)
            this.categoryList = res.body
          },function (err) {
            console.log(err)
          });

        this.$http.get('/api/getCourseList')
          .then((res) => {
            console.log(res.body);
            this.courseList = res.body
          },(err) => {
            console.log(err)
          })
      },
      data() {
        return {
          invTime: 2000,
          slides: [
            {
              src: require('../assets/slideShow/pic1.jpg'),
              title: '广告板1',
              href: 'course/analysis'
            },
            {
              src: require('../assets/slideShow/pic2.jpg'),
              title: '广告板2',
              href: 'course/count'
            },
            {
              src: require('../assets/slideShow/pic3.jpg'),
              title: '广告板3',
              href: 'http://xxx.xxx.com'
            },
            {
              src: require('../assets/slideShow/pic4.jpg'),
              title: '广告板4',
              href: 'course/forecast'
            }
          ],
          courseList: [],
          //   [
          //   {
          //     title: 'java',
          //     description: 'java博客，希望能够写出一套完善的java入门教程',
          //     img: 'java',
          //     url: 'java',
          //   },
          //   {
          //     title: '大数据',
          //     description: '大数据博客，分享学习大数据过程中的心得',
          //     img: 'big-data',
          //     url: 'bigData',
          //   },
          //   {
          //     title: 'linux',
          //     description: '大学时期一直觉得以为玩Redhat的学长很酷',
          //     img: 'linux',
          //     url: 'linux',
          //   },
          //   {
          //     title: '前端',
          //     description: '接触了前端之后就停不下来了',
          //     img: 'front-end',
          //     url: 'frontEnd',
          //   }
          // ],
          newsList: [
            {
              title:'java从入门到放弃',
              url:''
            },
            {
              title:'mysql从入门到放弃',
              url:''
            },
            {
              title:'大数据从入门到放弃',
              url:''
            }
          ],
          categoryList:[]
          // categoryList: [
          //   {
          //     name: '技术随笔',
          //     list: [
          //       {
          //         name: 'java',
          //         url: 'http://starcraft.com'
          //       },
          //       {
          //         name: '前端',
          //         url: 'http://warcraft.com'
          //       },
          //       {
          //         name: '大数据',
          //         url: 'http://overwatch.com',
          //         hot: true
          //       },
          //       {
          //         name: 'linux',
          //         url: 'http://hearstone.com'
          //       }
          //     ]
          //   },
          //   {
          //     name: '生活随笔',
          //     list: [
          //       {
          //         name: '开心一刻',
          //         url: 'http://weixin.com'
          //       },
          //       {
          //         name: '逗乐视频',
          //         url: 'http://twitter.com',
          //         hot: true
          //       },
          //       {
          //         name: '全民相册',
          //         url: 'http://maps.com'
          //       }
          //     ]
          //   },
          //   {
          //     name:'工作随笔',
          //     last:true,
          //     list:[
          //       {
          //         name:'工作点滴',
          //         url:''
          //       }
          //     ]
          //   }
          // ]
        }
      }
    }
</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
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
  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }
  .index-left-block .hr {
    margin-bottom: 20px;
  }
  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px;
  }
  .index-board-list {
    overflow: hidden;
  }
  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }
  .index-board-java .index-board-item-inner{
    background: url(../assets/images/1.png) no-repeat;
  }
  .index-board-linux .index-board-item-inner{
    background: url(../assets/images/2.png) no-repeat;
  }
  .index-board-big-data .index-board-item-inner{
    background: url(../assets/images/3.png) no-repeat;
  }
  .index-board-front-end .index-board-item-inner{
    background: url(../assets/images/4.png) no-repeat;
  }
  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .line-last {
    margin-right: 0;
  }
  .index-board-button {
    margin-top: 20px;
  }
  .lastest-news {
    min-height: 512px;
  }
  .hot-tag {
    background: red;
    color: #fff;
  }
  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
