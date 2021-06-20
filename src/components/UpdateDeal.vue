<template>
    <form id="deal-upd-form" @submit.prevent="sendUpdate">
      <div class="mt-05">
        <label>Новое имя</label>
        <input v-model="updData.name" type="text" class="w-100">
      </div>
      <div class="mt-05">
        <label>Новая сумма</label>
        <input v-model="updData.payment" type="number" class="w-100">
      </div>
      <div class="mt-05">
        <label>Клиент</label>
        <input v-model="updData.client" type="text">
      </div>
      <div class="mt-05">
        <label>Статус</label>
        <input v-model="updData.status" type="text">
      </div>
      <div class="mt-05">
        <label>Видимость другим пользователям</label>
        <input v-model="updData.public" type="checkbox">
      </div>
      <div class="mt-05">
        <label>Ответственное лицо:</label>
        <select v-model="updData.assigned">
          <option
            v-for="user in users"
            :key="user.pk"
            :value="user.pk"
          >{{ user.username }}</option>
        </select>
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
  name: 'UpdateDeal',
  props: ['element'],
  data () {
    return {
      updData: Object,
      users: []
    }
  },
  mixins: [
    RequestsMixin
  ],
  mounted () {
    this.users = this.$store.getters.users
    if (this.users.length === 0) {
      this.getReq('/users.json').then(resp => {
        if (resp.status === 200) {
          return resp.json()
        } else {
          return null
        }
      }).then(json => {
        if (json !== null) {
          this.$store.commit('update', { type: 'users', data: json.results })
          this.users = json.results
        }
      })
    }
  },
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
            const num = this.$store.getters.deals.indexOf(this.element)
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
