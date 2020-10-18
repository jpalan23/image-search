import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Router from 'vue-router'
Vue.use(VueRouter)

export default new Router({
  routes:[
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'history'
})