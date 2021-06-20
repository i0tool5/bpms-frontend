<script>
export default {
  name: 'PagesMixin',
  methods: {
    nextp: function () {
      this.getReq(this.nextPage)
        .then(resp => {
          if (resp.status === 200) {
            return resp.json()
          } else {
            return null
          }
        })
        .then(json => {
          if (json !== null) {
            this.$store.commit('update', { type: this.$route.name, data: json.results })
            this.elements = json.results
            this.nextPage = json.next
            this.prevPage = json.previous
          } else {
            console.log('Error!')
          }
        })
        .catch(_ => {
          window.alert('Something went wrong!')
        })
    },
    prevp: function () {
      this.getReq(this.prevPage)
        .then(resp => {
          if (resp.status === 200) {
            return resp.json()
          } else {
            return null
          }
        })
        .then(json => {
          if (json !== null) {
            this.$store.commit('update', { type: this.$route.name, data: json.results })
            this.elements = json.results
            this.nextPage = json.next
            this.prevPage = json.previous
          } else {
            console.log('Error!')
          }
        })
        .catch(_ => {
          window.alert('Something went wrong!')
        })
    }
  }
}
</script>
