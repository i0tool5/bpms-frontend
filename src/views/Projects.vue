<template>
  <div v-if="$store.getters.auth">
    <div class="text-center bg-alice pad-05">
      <h1 class="inl-blk">Список проектов</h1>
      <span
        class="ml-05 inl-blk cursor-ptr"
        title="Добавить"
        @click="modal_visible.create = !modal_visible.create">
        <font-awesome-icon icon="plus-square"></font-awesome-icon>
      </span>
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
          <span>
            <input type="hidden" class="identificator" :value="element.uid">
            <p @click="addProjTask(element.uid)" class="manip">+</p>
            <img @click="updateElement" class="manip" src="@/assets/edit.svg">
            <img @click="prepareDelete" class="manip" src="@/assets/delete.svg">
          </span>
        </div>
        <div class="container-body">
          <label class="name-wrap">Суммa</label>
          <div class="data-field">
            {{ element.payment }}
          </div>
          <label class="name-wrap">Создал</label>
          <div class="data-field">
            {{ element.created_by }}
          </div>
          <label class="name-wrap">Дата начала</label>
          <div class="data-field">
            {{ element.begin_date }}
          </div>
          <label class="name-wrap">Дата окончания</label>
          <div class="data-field">
            {{ element.end_date }}
          </div>
          <label>Описание</label>
          <div style="min-height: 3em;">
            <textarea title="Описание" readonly v-model="element.description"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>Здесь ничего нет...</h3>
    </div>
    <button
      class="button btn-blue"
      @click="modal_visible.create = !modal_visible.create"
    >Добавить проект</button>
    <div :class="[{'modal-visible': addTask}, 'modal']">
      <div class="modal-content">
        <div class="modal-header">
          <span @click="addTask = !addTask" class="close f-right">&times;</span>
          <h3>Добавить задачу к проекту {{ projObj.name }}</h3>
        </div>
        <div class="modal-body">
          <create-task
            :addingTo="projObj"
            @pushTask="handleTask"
          ></create-task>
        </div>
        <div class="modal-footer">
          <button class="button btn-green" @click="sendTask">Сохранить</button>
          <button class="button btn-red" @click="addTask = !addTask">Отмена</button>
        </div>
      </div>
    </div>
    <div :class="[{'modal-visible': modal_visible.create}, 'modal']">
      <div class="modal-content">
        <div class="modal-header">
          <span @click="modal_visible.create = !modal_visible.create" class="close f-right">&times;</span>
          <h3>Создание проекта</h3>
        </div>
        <div class="modal-body">
          <create-form
            @closemodal="modal_visible.create = !modal_visible.create"
          ></create-form>
        </div>
        <div class="modal-footer">
          <input class="button btn-green" form="proj-form" type="submit" value="Сохранить">
          <button class="button btn-red" @click="modal_visible.create = !modal_visible.create">Отмена</button>
        </div>
      </div>
    </div>
    <div :class="[{'modal-visible': modal_visible.update}, 'modal']">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Изменение проекта <i>{{ updateElem.name }}</i></h3>
        </div>
        <div class="modal-body">
          <update-form
            :element='updateElem'
            @renew="renew"
          ></update-form>
        </div>
        <div class="modal-footer">
          <input form="update-form" class="button btn-green" type="submit" value="Сохранить">
          <button class="button btn-red" @click="modal_visible.update = !modal_visible.update">Отмена</button>
        </div>
      </div>
    </div>
    <div :class="[{'modal-visible': modal_visible.delete}, 'modal']">
      <warn
        @confirm="deleteElement"
        @decline="modal_visible.delete = !modal_visible.delete"
      >{{ deleteElem.name }}</warn>
    </div>
    <div class="button-box bg-alice pad-05">
      <button class="button btn-hlw-blue" v-if="prevPage" @click="prevp">Предыдущая</button>
      <label style="padding: 0.5em;">Всего страниц: {{ pageCount }}</label>
      <button class="button btn-hlw-blue" v-if="nextPage" @click="nextp">Следующая</button>
    </div>
  </div>
</template>

<script>
import RequestsMixin from '@/components/mixins/RequestsMixin'
import PagesMixin from '@/components/mixins/PagesMixin'
import PermissionsMixin from '@/components/mixins/PermissionsMixin'
import CreateForm from '@/components/CreateProject'
import UpdateForm from '@/components/UpdateProject'
import CreateTask from '@/components/CreateTask'
import Warn from '@/components/Warn'

export default {
  name: 'Projects',
  data () {
    return {
      nextPage: null,
      prevPage: null,
      pageCount: 0,
      updateElem: Object,
      deleteElem: Object,
      addTask: false,
      projObj: '',
      newTask: '',
      modal_visible: {
        create: false,
        update: false,
        delete: false
      }
    }
  },
  components: {
    CreateForm,
    CreateTask,
    UpdateForm,
    Warn
  },
  mixins: [
    RequestsMixin,
    PermissionsMixin,
    PagesMixin
  ],
  computed: {
    elements: {
      get () {
        return this.$store.getters.projects
      },
      set () {}
    }
  },
  mounted () {
    this.getReq(`${this.$route.path}/`).then(resp => {
      if (resp.status === 200) {
        return resp.json()
      } else {
        return null
      }
    }).then(json => {
      if (json !== null) {
        this.nextPage = json.next
        this.prevPage = json.previous
        this.pageCount = Math.ceil(json.count / 10)
        this.$store.commit('update', { type: this.$route.name, data: json.results })
        this.elements = json.results
      } else {
        console.log('Data was empty')
      }
    }).catch(err => console.log('Error', err))
  },
  methods: {
    addProjTask: function (pId) {
      this.projObj = this.elements.filter(p => p.uid === pId)[0]
      this.addTask = !this.addTask
    },
    handleTask: function (el) {
      this.newTask = el
    },
    sendTask: function () {
      this.postReq('/tasks/', this.newTask)
        .then(resp => {
          if (resp.status === 201) {
            return null
          } else {
            console.log('Something Went wrong while creating task')
            return resp.json()
          }
        })
        .then(json => {
          if (json != null) {
            console.log('Resp:', json)
          }
        })
        .catch(err => {
          console.log('Error occured:', err)
        })
    },
    updateElement: function (ev) {
      const x = ev.target.parentElement.querySelector('.identificator').value
      const v = this.elements.filter(v => v.uid === x)
      this.updateElem = v[0]
      this.modal_visible.update = !this.modal_visible.update
    },
    prepareDelete: function (ev) {
      const targetVal = ev.target.parentElement.querySelector('.identificator').value
      const target = this.$store.getters.projects.find(el => el.uid === targetVal)
      this.deleteElem = target
      this.modal_visible.delete = true
    },
    deleteElement: function () {
      const targetVal = this.deleteElem.uid
      this.deleteReq(`${this.$route.path}/${targetVal}/`).then(resp => {
        if (resp.status === 204) {
          const filtered = this.$store.state.projects.filter(el => el.uid !== targetVal)
          this.$store.commit('update', { type: this.$route.name, data: filtered })
          this.elements = this.$store.getters.projects
          this.modal_visible.delete = false
        }
      })
    },
    renew: function (dat) {
      this.modal_visible.update = !this.modal_visible.update
      this.$store.commit('replace', dat)
    }
  }
}
</script>
