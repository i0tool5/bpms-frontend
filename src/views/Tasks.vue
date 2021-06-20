<template>
    <div>
      <div class="text-center bg-alice pad-05">
        <h1>Список поставленных задач</h1>
      </div>
      <div
        v-if="elements.length"
        class="cont-box"
      >
        <div
          v-for="element in elements"
          :key="element.uid"
          class="container"
        >
          <div class="container-head">
            <span>{{ element.name }}</span>
          </div>
          <div class="container-body">
            <label class="name-wrap">Создал</label>
            <div class="data-field">
              {{ element.created_by }}
            </div>
            <label class="name-wrap">Ответственные</label>
            <div class="data-field">
                <a
                  v-for="usr in element.assign"
                  :key="usr.id"
                >{{ usr }} </a>
            </div>
            <label class="name-wrap">Дата начала</label>
            <div class="data-field">
              {{ element.begin_date }}
            </div>
            <label class="name-wrap">Дата окончания</label>
            <div class="data-field">
              {{ element.end_date }}
            </div>
            <label class="name-wrap">Статус</label>
            <div class="data-field">
              {{ getStatus(element.status) }}
            </div>
            <label class="name-wrap">Приоритет</label>
            <div class="data-field">
              {{ getPrio(element.priority) }}
            </div>
            <label>Описание</label>
            <div style="min-height: 3em;">
              <textarea title="Описание" readonly v-model="element.description"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import PermissionsMixin from '@/components/mixins/PermissionsMixin'
import RequestsMixin from '@/components/mixins/RequestsMixin'
export default {
  name: 'Tasks',
  data () {
    return {
      nextPage: null,
      prevPage: null,
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
    elements: {
      get () {
        return this.$store.getters.tasks
      },
      set () {}
    }
  },
  mounted () {
    this.getReq(`${this.$route.path}/`)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json()
        } else {
          return null
        }
      })
      .then(json => {
        if (json !== null) {
          this.nextPage = json.next
          this.prevPage = json.previous
          this.$store.commit('update', { type: this.$route.name, data: json.results })
          this.elements = json.results
        } else {
          console.log('Data was empty!')
        }
      })
      .catch(err => console.log('Error occured:', err))
  },
  mixins: [
    PermissionsMixin,
    RequestsMixin
  ],
  methods: {
    getStatus: function (n) {
      return (this.statuses.find(el => el.id === Number(n))).status
    },
    getPrio: function (n) {
      return (this.priorities.find(el => el.id === Number(n))).prio
    }
  }
}
</script>
