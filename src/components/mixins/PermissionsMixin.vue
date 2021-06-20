<script>
export default {
  name: 'PermissionsMixin',
  beforeCreate () {
    if (!this.$store.getters.auth) {
      this.$router.replace('/')
    }
  }
}
</script>
