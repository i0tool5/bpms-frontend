<template>
  <div id="app1">
    <div v-if="logged">
      <span :id="'m3nuBtn'" @click="changeNav">
        <div :class="[{'rotating': rotate}, 'rotatable', 'inl-blk']">
          &#9776;
        </div>
         Меню
      </span>
      <div @click="dropShow = !dropShow" class="f-right dropdown bg-light">
        <font-awesome-icon icon="user-tie" size="4x"></font-awesome-icon>
        <div :class="[{'dropdown-show': dropShow}, 'dropdown-content']">
          <router-link :to="{name: 'profile'}">
            Профиль
          </router-link>
          <a id="logout" @click="logout">
            <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
            Выйти
          </a>
        </div>
      </div>
      <div :class="[visible ? 'sidenav-show' : 'w-0' ,'sidenav']" id="mySidenav">
        <a href="javascript:void(0)" class="closebtn" @click="changeNav">&times;</a>
        <div @click="changeNav">
          <router-link :to="{ name: 'projects' }">
            <font-awesome-icon icon="stream"></font-awesome-icon>
            Проекты
          </router-link>
        </div>
        <div @click="changeNav">
          <router-link :to="{ name: 'deals' }">
          <font-awesome-icon icon="briefcase"></font-awesome-icon> Сделки
          </router-link>
        </div>
        <div @click="changeNav">
          <router-link :to="{name: 'tasks'}"><font-awesome-icon icon="tasks">
            </font-awesome-icon> Задачи
          </router-link>
        </div>
        <div @click="changeNav">
          <router-link :to="{name: 'contacts'}"><font-awesome-icon icon="address-book"></font-awesome-icon> Контакты</router-link>
        </div>
        <div @click="changeNav">
          <router-link :to="{ name: 'companies' }">
            <font-awesome-icon icon="building"></font-awesome-icon> Компании
          </router-link>
        </div>
        <a id="logout" @click="logout">
          <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
          Выйти
        </a>
      </div>
    </div>
    <div :id="'routerview'" style="margin-left: 10px;">
      <router-view/>
    </div>
  </div>
</template>

<script>
const methods = {
  changeNav: function () {
    this.visible = !this.visible
    this.rotate = !this.rotate
  },
  logout: function () {
    this.$store.commit('logout')
    this.changeNav()
    this.$router.replace('/')
  }
}

export default {
  name: 'App',
  data () {
    return {
      rotate: false,
      visible: false,
      dropShow: false
    }
  },
  computed: {
    logged: (vm) => vm.$store.getters.auth
  },
  methods

}
</script>

<style>
@import './assets/css/styles.css';
#app1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1em;
}
#logout {
  opacity: 0.7;
  color: #f00;
  cursor: pointer;
}
#logout:hover {
  opacity: 1;
}
#m3nuBtn {
  font-size: 30px;
  cursor: pointer;
}
.rotatable {
  transition: 1s;
  position: relative;
}
.rotating {
  transform: rotate(90deg);
}
</style>
