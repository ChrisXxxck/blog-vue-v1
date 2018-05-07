<template>
    <div class="edit-area">
      <div class="article-info input-group form-group">
        <div class="input-group-btn">
          <button type="button" style="height:46px;margin-right:-2px;" class="btn btn-default btn-md dropdown-toggle blog__type-toggle" data-type="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span>原创</span> <span class="caret"></span></button>
          <ul class="dropdown-menu">
            <li><a href="#" class="blog__type-1">原创</a></li>
            <li><a href="#" class="blog__type-2">转载</a></li>
            <li><a href="#" class="blog__type-3">翻译</a></li>
          </ul>
        </div><!-- /btn-group -->
        <input name="id" class="hidden" v-model="article.id">
        <input id="myTitle" type="text" name="title" required="" data-error="" autocomplete="off" class="form-control tagClose input-lg" placeholder="标题：那是我夕阳下的奔跑" v-model="article.title">
      </div>
      <div class="form-group">
        <input type="text" class="form-control input-lg" placeholder="摘要" v-model="article.abstract">
      </div>
      <div class="row">
        <div class="col-md-3">
          <select id="articleBlogid" name="blogId" class="form-control" v-model="article.type">
            <option value="0">课程文章</option>
            <option value="1">文章随笔</option>
          </select>
        </div>
        <div class="col-md-3" v-if="article.type == 1">
          <select name="channel" class="form-control" v-model="article.category">
            <option value="-1">选择目录</option>
            <option v-for="category in categoryList" :value="category.id">{{category.name}}</option>
          </select>
        </div>
        <div class="col-md-3" v-else>
          <select name="channel" class="form-control" v-model="article.course">
            <option value="-1">选择课程</option>
            <option v-for="course in courseList" :value="course.id">{{course.title}}</option>
          </select>
        </div>
        <!--<div class="form-group col-md-3">-->
          <!--<div class="form-group">-->
            <!--<input type="text" class="form-control" placeholder="Search">-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <textarea id="blogEditor" rows="10" cols="80"></textarea>
      <div class="edit-footer">
        <button data-toggle="tooltip" @click="saveArticle" data-placement="top" title="" type="button" data-type="article" id="saveIt" class="btn btn-primary ml10" data-id="" data-do="post" data-url="" data-text="保存文章" data-name="" data-original-title="">
          保存文章
        </button>
        <button data-toggle="tooltip" @click="publishArticle" data-placement="top" title="" type="button" data-type="article" id="publishIt" class="btn btn-primary ml10" data-id="" data-do="post" data-url="" data-text="发布文章" data-name="" data-original-title="">
          发布文章
        </button>
      </div>
    </div>
</template>

<script>
    import CKEDITOR from "CKEDITOR"
    export default {
      name: "article-edit",
      mounted: function () {
        CKEDITOR.replace("blogEditor", {height: "500px", width: "100%", toolbar: "Full"});
        // this.editor = CKEDITOR.instances.editor2;
        // console.log(this.editor);
        // alert('mounted')
      },
      created: function () {
        this.$http.get('/api/courses/getAllCourses')
          .then((res) => {
            this.courseList = res.body
          }, function (err) {
            console.log(err)
          });
        this.$http.get('/api/categories/getAllCategories')
          .then((res) => {
            this.categoryList = res.body
          }, function (err) {
            console.log(err)
          });
        this.article.id = this.$route.params.id;
        if (this.article.id != undefined && this.article.id != '' && this.article.id != null){
          this.$http.get('/api/articles/getArticleById',{params:{id:this.article.id}})
            .then((res) => {
              let result = res.body[0];
              this.article.title = result.title;
              this.article.abstract = result.abstract;
              this.article.type = result.type;
              if(result.type == 1){
                this.article.category = result.belong_to;
              }else {

              }
              CKEDITOR.instances.blogEditor.setData(result.content);
            },function (err) {
              console.log(err)
            })
        }else {
          this.article =  {
            title: '',
            abstract: '',
            type: 0,
            category: -1,
            course: -1,
            content: ''
          }
        }
        // alert(this.article.id)
      },
      data() {
        return {
          article: {
            title: '',
            abstract: '',
            type: 0,
            category: -1,
            course: -1,
            content: ''
          },
          courseList: [],
          categoryList: [],
          editor:{}
        }
      },
      methods: {
        saveArticle() {
          console.log(this.article);
          let content = CKEDITOR.instances.blogEditor.getData();
          this.article.content = content;
          this.article.operation = 'save';
          this.$http.post('/api/articles/publishArticle', {
            article: JSON.stringify(this.article)
          }, {emulateJSON: true}).then((res) => {
            if (res.body.success){
              alert('保存成功');
              this.$router.push({path:'/admin/articles'})
            }
          },function (err) {
            console.log(err)
          });
        },
        publishArticle() {
          let content = CKEDITOR.instances.blogEditor.getData();
          this.article.content = content;
          this.article.operation = 'publish';
          console.log(this.article);
          this.$http.post('/api/articles/publishArticle', {
            article: JSON.stringify(this.article)
          }, {emulateJSON: true}).then((res) => {
            if (res.body.success){
              alert('发布成功');
              this.$router.push({path:'/admin/articles'})
            }
          },function (err) {
            console.log(err)
          });
        },
      },
      watch: {
        '$route' (to, from) {
          this.article.id = this.$route.params.id;
          // if (CKEDITOR.instances.blogEditor){
          //   CKEDITOR.instances.blogEditor.destroy();
          //   CKEDITOR.replace("blogEditor", {height: "500px", width: "100%", toolbar: "Full"});
          // }
          if (this.article.id != undefined && this.article.id != '' && this.article.id != null){
            this.$http.get('/api/articles/getArticleById',{params:{id:this.article.id}})
              .then((res) => {
                let result = res.body[0];
                this.article.title = result.title;
                this.article.abstract = result.abstract;
                this.article.type = result.type;
                if(result.type == 1){
                  this.article.category = result.belong_to;
                }else {

                }
                CKEDITOR.instances.blogEditor.setData(result.content);
              },function (err) {
                console.log(err)
              })
          }else {
            this.article =  {
              title: '',
              abstract: '',
              type: 0,
              category: -1,
              course: -1,
              content: ''
            }
          }
        }
      },
    }
</script>

<style scoped>
.edit-area{
  padding-top:20px;
}
.row{
  padding-bottom:10px;
}
.edit-footer{
  margin-top: 10px;
}
.ml10 {
  margin-left: 10px !important;
}
.btn {
  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  box-shadow: 0 1px 1px rgba(0,0,0,0.05);
}
.btn-primary {
  color: #fff;
  background-color: #009a61;
  border-color: #008151;
}
</style>
