import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index'
import CoursePage from '@/pages/course'
import DetailAnaPage from '@/pages/course/java'
import DetailCouPage from '../pages/course/bidData'
import DetailForPage from '../pages/course/linux'
import DetailPubPage from '../pages/course/frontEnd'
import ArticleDirectory from '../pages/articleDirectory'
import  ArticleDetail from '../pages/articleDetail'
import AdminIndex from '../pages/admin/adminIndex'
import AboutMeManagement from  '../pages/admin/aboutMeManagement'
import ArticleManagement from  '../pages/admin/articleManagement'
import CategoryManagement from  '../pages/admin/categoryManagement'
import CommentManagement from  '../pages/admin/commentManagement'
import CourseManagement from  '../pages/admin/courseManagement'
import ArticleEdit from '../pages/admin/articleEdit'
import $ from 'jquery'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/course',
      component: CoursePage,
      redirect:'/course/java',
      children:[
        {
          path: 'java',
          component: DetailAnaPage
        },
        {
          path: 'bigData',
          component: DetailCouPage
        },
        {
          path: 'linux',
          component: DetailForPage
        },
        {
          path: 'frontEnd',
          component: DetailPubPage
        }
      ]
    },
    {
      path:'/articles/:type',
      component:ArticleDirectory,
    },
    {
      path:'/article/:id',
      component:ArticleDetail,
    },
    {
      path:'/admin',
      component:AdminIndex,
      redirect:'/admin/articles',
      children:[
        {
          path: 'articles',
          component: ArticleManagement,
          // children:[
          //   {
          //     path:'edit',
          //     component:ArticleEdit
          //   }
          // ]
        },
        // {
        //   path:'articles/edit',
        //   component:ArticleEdit
        // },
        {
          path: 'comments',
          component: CommentManagement
        },
        {
          path: 'courses',
          component: CourseManagement
        },
        {
          path: 'categories',
          component: CategoryManagement
        },
        {
          path: 'about',
          component: AboutMeManagement
        }
      ]
    },
    {
      path:'/admin/article/edit',
      component:ArticleEdit
    },
    {
      path:'/admin/article/edit/:id',
      component:ArticleEdit
    }
  ]
})
