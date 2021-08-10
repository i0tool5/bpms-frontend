<template>
    <div>
      <h1>Ваш профиль, {{ user.username }}</h1>
      <div>
        <p>Последний вход в систему: <strong>{{ accDate }}</strong></p>
        <table>
          <tr>
            <th>Количество созданных проектов</th>
            <td>{{ user.user_projects }}</td>
          </tr>
          <tr>
            <th>Количество созданных сделок</th>
            <td>{{ user.user_deals }}</td>
          </tr>
          <tr>
            <th>Количество назначенных сделок</th>
            <td>{{ user.user_assigned_deals }}</td>
          </tr>
          <tr>
            <th>Количество созданных задач</th>
            <td>{{ user.user_tasks }}</td>
          </tr>
            <th>Количество назначенных задач</th>
            <td>{{ user.user_assigned_tasks }}</td>
          <tr>
          </tr>
        </table>
      </div>
      <div id="profile-settings">
        <h1>Изменение профиля</h1>
        <div>
          <h2>Изменить имя пользователя</h2>
          <span
            v-show="showError"
          >Произошла ошибка: {{ errText }}</span>
          <table>
            <tbody>
              <tr>
                <td>Новое имя пользователя:</td>
                <td>
                  <input style="text-align:center;" v-model="newUsername" type="text">
                </td>
              </tr>
            </tbody>
            <input @click="changeLogin"
                type="button"
                name="snd-btn"
                value="Отправить"
                class="button btn-green w-100"
            >
          </table>
        </div>
        <div id="password-settings">
          <h2>Изменить пароль</h2>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Новый пароль:</td>
                  <td>
                    <input :class="'w-100'" type="password"
                      v-model="passChange.new_password">
                  </td>
                </tr>
                <tr>
                  <td>Старый пароль:</td>
                  <td>
                    <input :class="['w-100', 'colored']" type="password" v-model="passChange.old_password">
                  </td>
                </tr>
              </tbody>
              <input @click="changePass"
                type="button"
                name="snd-btn"
                value="Отправить"
                class="button btn-green w-100"
              >
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import RequestsMixin from '@/components/mixins/RequestsMixin'
import PermissionsMixin from '@/components/mixins/PermissionsMixin'

export default {
  name: 'Profile',
  data () {
    return {
      user: {},
      newUsername: '',
      passChange: {
        old_password: '',
        new_password: ''
      },
      errText: '',
      showError: false
    }
  },
  mixins: [
    RequestsMixin,
    PermissionsMixin
  ],
  mounted () {
    this.getReq('/users/profile')
      .then(resp => resp.json())
      .then(json => {
        this.user = json
      })
  },
  computed: {
    accDate () {
      const loginDate = new Date(this.user.last_login)
      return `${loginDate.toLocaleDateString()} ${loginDate.toLocaleTimeString()}`
    }
  },
  methods: {
    changePass: function () {
      this.postReq('/users/profile/change_password/', this.passChange)
    },
    changeLogin: function () {
      this.postReq('/users/profile/change_login/',
        { new_name: this.newUsername }
      ).then(resp => {
        if (resp.status !== 200) {
          const x = {}
          const json = resp.json()
          json.then(dat => { x.errors = dat })
          var prom = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(x)
            }, 300)
          })
          return prom
        }
        return resp.json()
      })
        .then(json => {
          if (json.errors) { // TODO: handle error more efficiently
            console.log(json.errors)
            var k = String
            for (k in json.errors) {
              this.errText += json.errors[k].join('.')
            }
            this.showError = true
            setTimeout(
              _ => {
                this.errText = ''
                this.showError = false
              }, 6000
            )
          }
        })
    }
  }
}
</script>

<style scoped>
.error {
  background-color: red;
}
</style>
