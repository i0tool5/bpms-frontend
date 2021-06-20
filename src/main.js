// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTasks,
  faStream,
  faUserTie,
  faBuilding,
  faBriefcase,
  faPlusSquare,
  faSignOutAlt,
  faAddressBook
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faTasks,
  faStream,
  faUserTie,
  faBuilding,
  faBriefcase,
  faPlusSquare,
  faSignOutAlt,
  faAddressBook
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
