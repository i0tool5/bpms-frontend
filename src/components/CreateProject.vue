<template>
  <form id="proj-form" v-on:submit.prevent="sendFormData">
    <div>
      <label>Название проекта:</label>
      <input v-model="proj.name" type="text" name="name" maxlength="128" placeholder="Название" required class="w-100">
    </div>
    <div style="margin-top: 10px;">
      <label>Сумма</label>
      <input v-model="proj.payment" type="number" name="payment" value="100000" required class="w-100">
    </div>
    <div style="margin-top: 10px;">
      <label>Дата начала:</label>
      <input v-model="proj.begin_date" type="date" name="begin_date" required>

    </div>
    <div style="margin-top: 10px;">
      <label>Дата окончания:</label>
      <input v-model="proj.end_date" type="date" name="end_date" required>
    </div>
    <div v-if="dateErr">
      <span class="localerr"> Дата начала проекта должна быть менше даты окончания</span>
    </div>
    <div style="margin-top: 10px;">
        <label for="showproj">Виден другим пользователям</label>
        <input v-model="proj.public" type="checkbox" id="showproj" reuired>
    </div>
    <div style="margin-top: 10px;">
      <label>Описание:</label>
      <textarea v-model="proj.description" name="description" cols="40" rows="10" maxlength="1000" id="id_description" class="w-100"></textarea>
    </div>
    <create-tasks
      @updTsks="updTsks"
    ></create-tasks>
  </form>
</template>

<script>
import RequestsMixin from '@/components/mixins/RequestsMixin'
import CreateTasks from '@/components/CreateTasks'

export default {
  name: 'CreateProject',
  data () {
    return {
      dateErr: false,
      proj: {
        name: '',
        payment: 10000,
        begin_date: '',
        end_date: '',
        public: false,
        description: '',
        tasks: []
      }
    }
  },
  components: {
    CreateTasks
  },
  mixins: [
    RequestsMixin
  ],
  methods: {
    validateDate: function (beg, end) {
      const b = new Date(beg)
      const e = new Date(end)
      if (b > e) {
        return false
      }
    },
    sendFormData: function () {
      if (this.validateDate(this.proj.begin_date, this.proj.end_date)) {
        this.postReq(`${this.$route.path}/`, this.proj)
          .then(response => {
            if (response.status !== 201) {
              return null
            }
            return response.json()
          })
          .then(json => {
            if (json !== null) {
              this.$emit('closemodal')
              this.$store.commit('append', { type: 'projects', data: json })
              this.proj = {
                name: '',
                payment: 10000,
                begin_date: '',
                end_date: '',
                visible: false,
                description: '',
                tasks: []
              }
            }
          })
      } else {
        this.dateErr = true
      }
    },
    updTsks: function (tsks) {
      this.proj.tasks = tsks
    }
  }
}
</script>

<style scoped>
  .localerr {
    font-size: 12px;
    font-style: italic;
    opacity: 0.7;
    color: red;
  }
</style>
