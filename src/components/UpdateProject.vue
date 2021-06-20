<template>
  <form id="update-form" @submit.prevent="sendUpdate">
    <div>
      <label>Новое имя</label>
      <input v-model="updData.name" type="text" class="w-100">
    </div>
    <div class="mt-05">
      <label>Новая сумма</label>
      <input v-model="updData.payment" type="number" class="w-100">
    </div>
    <div class="mt-05">
      <label>Новая дата начала</label>
      <input v-model="updData.begin_date" type="date">
    </div>
    <div class="mt-05">
      <label>Новая дата окончания</label>
      <input v-model="updData.end_date" type="date">
    </div>
    <div class="mt-05">
      <label>Новое описание</label>
      <textarea v-model="updData.description" maxlength="1000" class="w-100"></textarea>
    </div>
  </form>
</template>

<script>
import RequestsMixin from '@/components/mixins/RequestsMixin'

export default {
  name: 'UpdateProject',
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
            const num = this.$store.getters.projects.indexOf(this.element)
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
