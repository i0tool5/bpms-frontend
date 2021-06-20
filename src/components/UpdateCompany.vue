<template>
    <form id="comp-upd-form" @submit.prevent="sendUpdate">
      <div class="mt-05">
        <label>Изменить название компании</label>
        <input class="w-100" type="text" v-model="updData.name" placeholder="">
      </div>
      <div class="mt-05">
        <label>Изменить адрес</label>
        <input class="w-100" type="text" v-model="updData.addr" placeholder="">
      </div>
      <div class="mt-05">
        <label>Изменить основной номер тел.</label>
        <input class="w-100" type="text" v-model="updData.phone_num_1" placeholder="">
      </div>
      <div class="mt-05">
        <label>Изменить дополнительный тел.</label>
        <input class="w-100" type="text" v-model="updData.phone_num_2" placeholder="">
      </div>
      <div class="mt-05">
        <label>Изменить почту</label>
        <input class="w-100" type="text" v-model="updData.e_mail" placeholder="">
      </div>
    </form>
</template>

<script>
import RequestsMixin from '@/components/mixins/RequestsMixin'

export default {
  name: 'UpdateCompany',
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
            const num = this.$store.getters.companies.indexOf(this.element)
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
