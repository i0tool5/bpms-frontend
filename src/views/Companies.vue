<template>
  <div
    v-if="$store.getters.auth"
  >
    <div class="text-center bg-alice pad-05">
      <h1 class="inl-blk">Список компаний</h1>
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
          <input type="hidden" class="identificator" :value="element.uid">
          <img class="manip" src="@/assets/edit.svg" @click="updateElement">
          <img
            class="manip"
            src="@/assets/delete.svg"
            @click="prepareDelete"
          >
        </div>
        <div class="container-body">
          <label class="name-wrap">Адрес</label>
          <div class="data-field">
            {{ element.addr }}
          </div>
          <label class="name-wrap">Основной номер тел.</label>
          <div class="data-field">
            {{ element.phone_num_1 }}
          </div>
          <label class="name-wrap">Номер телефона доп.</label>
          <div class="data-field">
            {{ element.phone_num_2 }}
          </div>
          <label class="name-wrap">Почта</label>
          <div class="data-field">
            {{ element.e_mail }}
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
    >Добавить компанию</button>
    <div :class="[{'modal-visible': modal_visible.create}, 'modal']">
      <div class="modal-content">
        <div class="modal-header">
          <span @click="modal_visible.create = !modal_visible.create" class="close f-right">&times;</span>
          <h3>Создание компании</h3>
        </div>
        <div class="modal-body">
          <create-company
            @sendCreate="sendCreate"
          />
        </div>
        <div class="modal-footer">
          <input class="button btn-green" form="company-form" type="submit" value="Сохранить">
          <button class="button btn-red" @click="modal_visible.create = !modal_visible.create">Отмена</button>
        </div>
      </div>
    </div>
    <div :class="[{'modal-visible': modal_visible.update}, 'modal']">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Изменение информации о компании <i>{{ updateElem.name }}</i></h3>
        </div>
        <div class="modal-body">
          <update-form
            :element='updateElem'
            @renew="renew"
          ></update-form>
        </div>
        <div class="modal-footer">
          <input form="comp-upd-form" class="button btn-green" type="submit" value="Сохранить">
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
    <button class="button btn-hlw-blue" v-if="prevPage" @click="prevp">Предыдущая</button>
    <button class="button btn-hlw-blue" v-if="nextPage" @click="nextp">Следующая</button>
  </div>
</template>

<script>
import Warn from '@/components/Warn'
import CreateCompany from '@/components/CreateCompany'
import UpdateForm from '@/components/UpdateCompany'
import RequestsMixin from '@/components/mixins/RequestsMixin'
import PermissionsMixin from '@/components/mixins/PermissionsMixin'
import PagesMixin from '@/components/mixins/PagesMixin'

export default {
  data () {
    return {
      elements: [],
      deleteElem: Object,
      updateElem: Object,
      nextPage: null,
      prevPage: null,
      modal_visible: {
        create: false,
        update: false,
        delete: false
      }
    }
  },
  components: {
    CreateCompany,
    UpdateForm,
    Warn
  },
  mixins: [
    RequestsMixin,
    PermissionsMixin,
    PagesMixin
  ],
  mounted () {
    this.getReq(`${this.$route.path}/`)
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          return null
        }
      })
      .then(json => {
        if (json !== null) {
          this.elements = json.results
          this.nextPage = json.next
          this.prevPage = json.previous
          this.$store.commit('update', { type: `${this.$route.name}`, data: json.results })
        }
      })
  },
  methods: {
    sendCreate: function (data) {
      this.postReq(`${this.$route.path}/`, data)
        .then(resp => {
          if (resp.status === 201) {
            return resp.json()
          } else {
            return null
          }
        })
        .then(json => {
          if (json !== null) {
            this.$store.commit('append', { type: this.$route.name, data: json })
          }
          this.modal_visible.create = !this.modal_visible.create
        })
    },
    updateElement: function (ev) {
      const x = ev.target.parentElement.querySelector('.identificator').value
      const v = this.elements.filter(el => el.uid === x)
      this.updateElem = v[0]
      this.modal_visible.update = !this.modal_visible.update
    },
    prepareDelete: function (ev) {
      const targetVal = ev.target.parentElement.querySelector('.identificator').value
      const target = this.elements.find(el => el.uid === targetVal)
      this.deleteElem = target
      this.modal_visible.delete = true
    },
    deleteElement: function () {
      const targetVal = this.deleteElem.uid
      this.deleteReq(`${this.$route.path}/${targetVal}/`).then(resp => {
        if (resp.status === 204) {
          const filtered = this.$store.state.companies.filter(el => el.uid !== targetVal)
          this.$store.commit('update', { type: this.$route.name, data: filtered })
          this.elements = this.$store.getters.companies
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
