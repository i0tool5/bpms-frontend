<template>
  <div id="task-fields">
    <div>
      <label>Название задачи</label>
      <input v-model="task.name" type="text" class="w-100" required>
    </div>
    <div class="mt-05">
      <label>Ответственный</label>
      <select v-model="task.assign" multiple required>
        <option
          v-for="user in users"
          :key="user.pk"
          :value="user.pk"
        >{{ user.username }}</option>
      </select>
    </div>
    <div class="mt-05">
      <label>Дата начала: </label>
      <input v-model="task.begin_date" type="date" required>
    </div>
    <div class="mt-05">
      <label>Дата окончания</label>
      <input v-model="task.end_date" type="date" required>
    </div>
    <div class="mt-05">
      <label>Статус задачи</label>
      <select v-model="task.status" required>
        <option
          v-for="status in statuses"
          :key="status.id"
          :value="status.id"
        >{{ status.status }}</option>
      </select>
    </div>
    <div class="mt-05">
      <label>Приоритет</label>
      <select v-model="task.priority" required>
        <option
          v-for="prio in priorities"
          :key="prio.id"
          :value="prio.id"
        >{{ prio.prio }}</option>
      </select>
    </div>
    <div class="mt-05">
      <label>Описание</label>
      <textarea v-model="task.description"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateTask',
  props: ['addingTo'],
  data () {
    return {
      task: {
        name: '',
        assign: [],
        content_type: this.$route.name,
        object_id: '',
        begin_date: Date,
        end_date: Date,
        status: 1,
        priority: 3,
        description: ''
      },
      statuses: [
        { id: 1, status: 'Открыта' },
        { id: 2, status: 'В работе' },
        { id: 3, status: 'Закрыта' }
      ],
      priorities: [
        { id: 1, prio: 'Низкий' },
        { id: 2, prio: 'Ниже среднего' },
        { id: 3, prio: 'Средний' },
        { id: 4, prio: 'Выше среднего' },
        { id: 5, prio: 'Высокий' },
        { id: 6, prio: 'Реального времени' }
      ]
    }
  },
  computed: {
    users: {
      get () {
        return this.$store.getters.users
      },
      set () {}
    }
  },
  mounted () {
    this.users = this.$store.getters.users
    this.$nextTick(function () {
      this.$emit('pushTask', this.task)
    })
  },
  watch: {
    addingTo: function (val, _) {
      this.addingTo = val
      this.task.object_id = val.uid
    }
  }
}
</script>
