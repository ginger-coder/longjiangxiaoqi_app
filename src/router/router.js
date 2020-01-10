import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import search from '@/page/search'
import school from '@/page/school'
import companylist from '@/page/companylist'
import organization from '@/page/organization'
import user from '@/page/user'
import jobsDetails from '@/page/jobsDetails'
import firmDetails from '@/page/firmDetail'
import schoolDetail from '@/page/schoolDetail'
import cpDetails from '@/page/cpDetail'
import login from '@/page/login';
import register from '@/page/register'
import Delivery from '@/page/delivery'
import myschool from '@/page/myschool'
import myorigin from '@/page/myorigin'
import Collect from '@/page/collect'



Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '',
        redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/school',
      name: 'school',
      component: school
    },
    {
      path: '/companylist',
      name: 'companylist',
      component: companylist
    },
    {
      path: '/organization',
      name: 'organization',
      component: organization
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/jobs',
      component: jobsDetails
    },
    {
      path: '/firmdetail',
      component: firmDetails
    },
    {
      path: '/cpdetail',
      component: cpDetails
    },
    {
      path: '/schooldetail',
      component: schoolDetail
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery
    },
    {
      path: '/myschool',
      name: 'myschool',
      component: myschool
    },
    {
      path: '/myorigin',
      name: 'myorigin',
      component: myorigin
    },
    {
      path: '/collect',
      name: 'collect',
      component: Collect
    }
  ]
})
