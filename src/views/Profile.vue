<template>
    <div>
      <h1>Ваш профиль, {{ user.username }}</h1>
      <div>
        <p>Последний вход в систему: <strong>{{ accDate }}</strong></p>
        <table>
        </table>
        <p>Количество созданных проектов: <span>{{ user.user_projects }}</span></p>
        <p>Количество созданных сделок: <span>{{ user.user_deals }}</span></p>
        <p>Количество назначенных сделок: <span>{{ user.user_assigned_deals }}</span></p>
        <p>Количество созданных задач: <span>{{ user.user_tasks }}</span></p>
        <p>Количество назначенных задач: <span>{{ user.user_assigned_tasks }}</span></p>
      </div>
      <div id="profile-settings">
        <h1>Изменение профиля</h1>
        <div>
          <h2>Изменить имя пользователя</h2>
          <table>
            <tbody>
              <tr>
                <td>Новое имя пользователя:</td>
                <td><input type="text"></td>
              </tr>
            </tbody>
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
                    <input :class="'w-100'" type="password" v-model="passChange.new_password">
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
      passChange: {
        old_password: '',
        new_password: ''
      }
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
      this.updateReq('/users/profile/change_password', this.passChange)
    }
  }
}
</script>
