import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/views/MainPage'
import Projects from '@/views/Projects'
import Deals from '@/views/Deals'
import Companies from '@/views/Companies'
import Contacts from '@/views/Contacts'
import Profile from '@/views/Profile'
import Tasks from '@/views/Tasks'
import NotFound from '@/views/NotFound404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/deals',
      name: 'deals',
      component: Deals
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
