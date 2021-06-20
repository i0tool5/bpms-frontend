<template>
  <form id="deal-form" @submit.prevent=sendFormData>
    <div>
      <label>Название сделки</label>
      <input v-model="deal.name" type="text" name="name" maxlength="128" class="w-100">
    </div>
    <div>
      <label>Сумма</label>
      <input v-model="deal.payment" type="number" name="payment" class="w-100">
    </div>
    <div>
      <label>Клиент</label>
      <input v-model="deal.client" type="text" name="client" maxlength="128" class="w-100">
    </div>
    <div>
      <label>Видимость другим пользователям</label>
      <input v-model="deal.public" type="checkbox" name="public">
    </div>
    <div>
      <label>Статус</label>
      <input v-model="deal.status" type="text" name="status">
    </div>
    <div>
      <label>Ответственное лицо</label>
      <select v-model="deal.assigned">
        <option
          v-for="user in users"
          :key="user.pk"
          :value="user.pk"
        >{{ user.username }}</option>
      </select>
    </div>
    <div>
      <label>Описание</label>
      <textarea name="description" cols="40" rows="10" maxlength="1000" v-model="deal.description"></textarea>
    </div>
  </form>
</template>

<script>
import RequestsMixin from '@/components/mixins/RequestsMixin'

export default {
  name: 'create-deal',
  data () {
    return {
      users: [],
      deal: {
        name: '',
        payment: 10000,
        public: false,
        client: '',
        status: '',
        assigned: 'Select',
        description: ''
      }
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
  methods: {
    sendFormData: function () {
      this.postReq(`${this.$route.path}/`, this.deal)
        .then(response => {
          if (response.status === 201) {
            return response.json()
          } else {
            return null
          }
        })
        .then(json => {
          if (json !== null) {
            this.$emit('closemodal')
            this.$store.commit('append', { type: 'deals', data: json })
          } else {
            alert('Error occured!')
          }
        })
    }
  }
}
</script>

<style scoped>
div {
  margin-top: 10px;
}
</style>
