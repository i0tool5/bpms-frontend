import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  isAuthenticated: window.localStorage.getItem('auth'),
  user_token: window.localStorage.getItem('user_token'),
  projects: [],
  deals: [],
  tasks: [],
  companies: [],
  contacts: [],
  users: [],
  deal_statuses: [],
}

const getters = {
  auth: state => state.isAuthenticated,
  token: state => state.user_token,
  projects: state => state.projects,
  deals: state => state.deals,
  tasks: state => state.tasks,
  companies: state => state.companies,
  contacts: state => state.contacts,
  users: state => state.users,
  statuses: state => state.deal_statuses,
}

const mutations = {
  update (state, data) {
    switch (data.type) {
      case 'projects':
        state.projects = data.data
        break
      case 'deals':
        state.deals = data.data
        break
      case 'tasks':
        state.tasks = data.data
        break
      case 'users':
        state.users = data.data
        break
      case 'companies':
        state.companies = data.data
        break
      case 'contacts':
        state.contacts = data.data
        break
    }
  },
  append (state, data) {
    switch (data.type) {
      case 'projects':
        state.projects.unshift(data.data)
        break
      case 'deals':
        state.deals.unshift(data.data)
        break
      case 'contacts':
        state.contacts.unshift(data.data)
        break
      case 'tasks':
        state.tasks.unshift(data.data)
        break
      case 'companies':
        state.companies.unshift(data.data)
        break
    }
  },
  replace (state, data) {
    switch (data.type) {
      case 'projects': {
        const proj = state.projects[data.num]
        for (const k in proj) {
          proj[k] = data.data[k]
        }
        break
      }
      case 'deals': {
        const deal = state.deals[data.num]
        for (const k in deal) {
          deal[k] = data.data[k]
        }
        break
      }
      case 'contacts': {
        const cont = state.contacts[data.num]
        for (const k in cont) {
          cont[k] = data.data[k]
        }
        break
      }
      case 'companies': {
        const comp = state.companies[data.num]
        for (const k in comp) {
          comp[k] = data.data[k]
        }
        break
      }
    }
  },
  login (state, token) {
    window.localStorage.setItem('auth', true)
    window.localStorage.setItem('user_token', token)
    state.isAuthenticated = true
    state.user_token = token
  },
  logout (state) {
    window.localStorage.setItem('auth', '')
    window.localStorage.setItem('user_token', '')
    state.isAuthenticated = false
    state.user_token = ''
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
