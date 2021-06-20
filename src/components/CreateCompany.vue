<template>
  <form id="company-form" @submit.prevent="sendFormData">
    <div>
      <label>Название компании</label>
      <input class="w-100" type="text" v-model="company.name" placeholder="">
    </div>
    <div>
      <label>Адрес</label>
      <input class="w-100" type="text" v-model="company.addr" placeholder="">
    </div>
    <div>
      <label>Основной номер тел.</label>
      <input class="w-100" type="text" v-model="company.phone_num_1" placeholder="">
    </div>
    <div>
      <label>Номер телефона доп.</label>
      <input class="w-100" type="text" v-model="company.phone_num_2" placeholder="">
    </div>
    <div>
      <label>Почта</label>
      <input class="w-100" type="text" v-model="company.e_mail" placeholder="">
    </div>
  </form>
</template>

<script>
export default {
  name: 'CreateCompany',
  data () {
    return {
      company: {
        name: '',
        addr: '',
        phone_num_1: '',
        phone_num_2: '',
        e_mail: ''
      }
    }
  },
  methods: {
    sendFormData: function () {
      this.$emit('sendCreate', this.company)
    }
  }
}
</script>
