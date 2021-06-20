<template>
  <form id="contact-form" v-on:submit.prevent="sendFormData">
    <div>
      <label>Название контакта</label>
      <input class="w-100" type="text" v-model="contact.name" placeholder="Иванов Иван Иванович">
    </div>
    <div>
      <label>Основной номер тел.</label>
      <input class="w-100" type="text" v-model="contact.phone_num_1">
    </div>
    <div>
      <label>Номер телефона доп.</label>
      <input class="w-100" type="text" v-model="contact.phone_num_2" placeholder="88001235476">
    </div>
    <div>
      <label>Компания</label>
      <input class="w-100" type="text" v-model="contact.company" placeholder="Roga&CO">
    </div>
    <div>
      <label>Почта</label>
      <input class="w-100" type="email" v-model="contact.e_mail" placeholder="i.ivanov@roga.co">
    </div>
  </form>
</template>

<script>
export default {
  name: 'CreateContact',
  data () {
    return {
      contact: {
        name: '',
        phone_num_1: '+79876543210',
        phone_num_2: '',
        company: '',
        e_mail: ''
      }
    }
  },
  methods: {
    sendFormData: function () {
      this.$emit('sendCreate', this.contact)
    }
  }
}
</script>
