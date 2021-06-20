<template>
  <div id="tasks-create-container">
    <div>
      <h2>Добавление задач</h2>
      <input type="button" @click="inc" value="+">
      <input v-if="tskCnt" type="button" @click="dec" value="-">
    </div>
    <div
      v-for="i in tskCnt"
      :key="i"
      :class="'task-container'"
    >
      <h3>Задача {{i}} <span @click="rmObj(i-1)" style="cursor: pointer; color: red;">X</span></h3>
      <create-task
        @pushTask="addTask"
      ></create-task>
    </div>
    <div
      class="mt-05"
      v-if="tsks.length"
    >
      <span>Количество добавляемых задач</span>
      <span>
        {{ tsks.length }}
      </span>
    </div>
  </div>
</template>

<script>
import CreateTask from '@/components/CreateTask'
import RequestsMixin from '@/components/mixins/RequestsMixin'

export default {
  name: 'CreateTasks',
  props: [
    'objToAdd'
  ],
  data () {
    return {
      tskCnt: 0,
      objectToAdd: '',
      tsks: []
    }
  },
  components: {
    CreateTask
  },
  mixins: [
    RequestsMixin
  ],
  watch: {
    objToAdd: function (val, _) {
      this.objectToAdd = val
    },
    tsks: function (val, _) {
      this.$emit('updTsks', this.tsks)
    }
  },
  mounted () {
    if (this.$store.getters.users < 1) {
      this.getReq('/users/')
        .then(resp => {
          if (resp.status === 200) {
            return resp.json()
          } else {
            return null
          }
        })
        .then(json => {
          if (json !== null) {
            this.$store.commit('update', { type: 'users', data: json.results })
          }
        })
    }
  },
  methods: {
    inc: function () {
      this.tskCnt++
    },
    dec: function () {
      if (this.tskCnt > 0) {
        this.tskCnt--
        this.tsks.pop()
      } else {
        this.tskCnt = 0
      }
    },
    rmObj: function (indexNum) {
      this.tskCnt--
      this.tsks.splice(indexNum, 1)
    },
    addTask: function (el) {
      this.tsks.push(el)
    }
  }
}
</script>

<style scoped>
.task-container {
  border: 1px solid rgba(100, 172, 230, 0.8);
  border-radius: 0.2rem;
  padding: 0.3em;
  margin-top: 0.5em;
}
</style>
