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
      <div>
        <h1>Изменение профиля</h1>
        <label>Новое имя пользователя</label>
        <input type="text" >
        <label>Изменить пароль</label>
        <input type="password">
        <label>Подтвердите пароль</label>
        <input type="password">
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
      user: {}
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
  }
}
</script>
