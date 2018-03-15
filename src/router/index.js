import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index'
import CoursePage from '@/pages/course'
import DetailAnaPage from '@/pages/detail/java'
import DetailCouPage from '../pages/detail/bidData'
import DetailForPage from '../pages/detail/linux'
import DetailPubPage from '../pages/detail/frontEnd'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
