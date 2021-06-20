<template>
  <form id="cont-upd-form" @submit.prevent="sendUpdate">
      <div class="mt-05">
        <label>Изменить имя</label>
        <input class="w-100" v-model="updData.name" type="text">
      </div>
      <div class="mt-05">
        <label>Изменить основной тел.</label>
        <input class="w-100" v-model="updData.phone_num_1" type="text">
      </div>
      <div class="mt-05">
        <label>Изменить дополнительный тел.</label>
        <input class="w-100" v-model="updData.phone_num_2" type="text">
      </div>
      <div class="mt-05">
        <label>Изменить компанию</label>
        <input class="w-100" v-model="updData.company" type="text">
      </div>
      <div class="mt-05">
        <label>Изменить почту</label>
        <input class="w-100" v-model="updData.e_mail" type="email">
      </div>
  </form>
</template>

<script>
import RequestsMixin from '@/components/mixins/RequestsMixin'

export default {
  name: 'UpdateContact',
  props: ['element'],
  data () {
    return {
      updData: Object
    }
  },
  mixins: [
    RequestsMixin
  ],
  watch: {
    element: function () {
      this.updData = Object.assign({}, this.element)
    }
  },
  methods: {
    sendUpdate: function () {
      this.updateReq(`${this.$route.path}/${this.updData.uid}/`, this.updData)
        .then(resp => {
          if (resp.status === 200) {
            return resp.json()
          } else {
            return null
          }
        })
        .then(json => {
          if (json !== null) {
            const num = this.$store.getters.contacts.indexOf(this.element)
            const newObj = {
              num,
              type: this.$route.name,
              data: json
            }
            this.$emit('renew', newObj)
          }
        })
    }
  }
}
</script>
