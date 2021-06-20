<template>
  <div v-if="$store.getters.auth">
    <div class="text-center bg-alice pad-05">
      <h1 class="inl-blk">Список сделок</h1>
      <span class="ml-05"
          title="Добавить"
          style="display: inline-block; cursor: pointer;"
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
            <img class="manip" @click="updateElement" src="@/assets/edit.svg">
            <img class="manip" @click="prepareDelete" src="@/assets/delete.svg">
          </span>
        </div>
        <div class="container-body">
          <label class="name-wrap">Суммa</label>
          <div class="data-field">
              {{ element.payment }}
          </div>
          <label class="name-wrap">Клиент</label>
          <div class="data-field">
              {{ element.client }}
          </div>
          <label class="name-wrap">Создал</label>
          <div class="data-field">
              {{ element.created_by }}
          </div>
          <label class="name-wrap">Статус</label>
          <div class="data-field">
              {{ element.status }}
          </div>
          <label class="name-wrap">Ответственное лицо</label>
          <div class="data-field">
            {{ assigned(element.assigned) }}
          </div>
          <label>Описание</label>
          <div>
            <textarea readonly v-model="element.description"></textarea>
          </div>
        </div>
      </div>
    </div>
    <h3 v-else>Здесь пусто...</h3>
      <button
        class="button btn-blue"
        @click="modal_visible.create = !modal_visible.create"
      >Добавить сделку</button>
    <div :class="[{'modal-visible': modal_visible.create}, 'modal']">
      <div class="modal-content">
        <div class="modal-header">
          <span @click="modal_visible.create = !modal_visible.create" class="close f-right">&times;</span>
          <h3>Создание сделки</h3>
        </div>
        <div class="modal-body">
          <create-form
            @closemodal="modal_visible.create=!modal_visible.create"
          ></create-form>
        </div>
        <div class="modal-footer">
          <input type="submit" class="button btn-green" form="deal-form" value="Сохранить">
          <button @click="modal_visible.create = !modal_visible.create" class="button btn-red">Отмена</button>
        </div>
      </div>
    </div>
    <div :class="[{'modal-visible': modal_visible.update}, 'modal']">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Изменение сделки <i>{{ updateElem.name }}</i></h3>
        </div>
        <div class="modal-body">
          <update-form
            :element='updateElem'
            @renew="renew"
          ></update-form>
        </div>
        <div class="modal-footer">
          <input form="deal-upd-form" class="button btn-green" type="submit" value="Сохранить">
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
  <div v-else>
    <h3>Login required!</h3>
    <router-link to="/">Main page</router-link>
  </div>
</template>

<script>
import CreateForm from '@/components/CreateDeal'
import UpdateForm from '@/components/UpdateDeal'
import Warn from '@/components/Warn'
import RequestsMixin from '@/components/mixins/RequestsMixin'
import PermissionsMixin from '@/components/mixins/PermissionsMixin'
import PagesMixin from '@/components/mixins/PagesMixin'

export default {
  name: 'Deals',
  data () {
    return {
      elements: this.$store.getters.deals,
      updateElem: Object,
      deleteElem: Object,
      prevPage: null,
      nextPage: null,
      modal_visible: {
        create: false,
        update: false,
        delete: false
      }
    }
  },
  components: {
    CreateForm,
    UpdateForm,
    Warn
  },
  mixins: [
    RequestsMixin,
    PermissionsMixin,
    PagesMixin
  ],
  mounted () {
    const reqPath = `${this.$route.path}/`
    this.getReq(reqPath).then(resp => {
      if (resp.status === 200) {
        return resp.json()
      } else {
        return null
      }
    }).then(json => {
      if (json !== null) {
        this.$store.commit('update', { type: 'deals', data: json.results })
        this.elements = this.$store.getters.deals
        this.nextPage = json.next
        this.prevPage = json.previous
      }
    }).catch(_ => {
      window.alert('Error occured!')
    })
  },

  methods: {
    assigned: function (val) {
      // filter for each deal. overhead. not optimal.
      const usr = this.$store.getters.users.filter(u => u.pk === val)
      return usr[usr.length - 1].username
    },
    updateElement: function (ev) {
      const x = ev.target.parentElement.querySelector('.identificator').value
      const v = this.elements.filter(v => v.uid === x)
      this.updateElem = v[0]
      this.modal_visible.update = !this.modal_visible.update
    },
    prepareDelete: function (ev) {
      const targetVal = ev.target.parentElement.querySelector('.identificator').value
      const target = this.$store.getters.deals.find(el => el.uid === targetVal)
      this.deleteElem = target
      this.modal_visible.delete = true
    },
    deleteElement: function () {
      this.deleteReq(`${this.$route.path}/${this.deleteElem.uid}/`).then(resp => {
        if (resp.status === 204) {
          const filtered = this.$store.state.deals.filter(el => el.uid !== this.deleteElem.uid)
          this.$store.commit('update', { type: this.$route.name, data: filtered })
          this.elements = this.$store.getters.deals
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
