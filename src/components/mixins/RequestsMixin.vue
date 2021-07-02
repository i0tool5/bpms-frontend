<script>

function urlPrep (url = '', def = '') {
  if (url.startsWith('http')) {
    return url
  } else {
    return `${def}${url}`
  }
}

export default {
  name: 'RequestsMixin',
  data () {
    return {
      defaultLocation: 'http://192.168.88.222:8000/api'
    }
  },
  methods: {
    getReq: async function (url = '') {
      return fetch(urlPrep(url, this.defaultLocation), {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + this.$store.getters.token
        }
      })
    },
    loginReq: async function (url = '', data = {}) {
      return await fetch(this.defaultLocation + url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data)
      })
    },
    postReq: async function (url = '', data = {}) {
      return await fetch(this.defaultLocation + url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + this.$store.getters.token
        },
        body: JSON.stringify(data)
      })
    },
    deleteReq: async function (url = '') {
      return fetch(this.defaultLocation + url, {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + this.$store.getters.token
        }
      })
    },
    updateReq: async function (url = '', data = {}) {
      return fetch(this.defaultLocation + url, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + this.$store.getters.token
        },
        body: JSON.stringify(data)
      })
    }
  }
}
</script>
