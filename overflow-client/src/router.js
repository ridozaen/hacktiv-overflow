import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import QuestionDetail from './views/QuestionDetail.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import UserDetails from './views/UserDetails.vue'
import FormQuestion from './views/FormQuestion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/question/:id',
      name: 'question_detail',
      component: QuestionDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        console.log('before enter register route')
        if (localStorage.getItem('curr-token')) {
          next({name: 'home'})
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        console.log('before enter register route')
        if (localStorage.getItem('curr-token')) {
          next({name: 'home'})
        } else {
          next()
        }
      }
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserDetails,
      beforeEnter: (to, from, next) => {
        console.log('before enter route')
        if (localStorage.getItem('curr-token')) {
          next()
        } else {
          next({name: 'home'})
        }
      }
    },
    {
      path: '/question/edit/:id',
      name: 'question_edit',
      component: FormQuestion,
      beforeEnter: (to, from, next) => {
        console.log('before enter route')
        if (localStorage.getItem('curr-token')) {
          next()
        } else {
          next({name: 'home'})
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
