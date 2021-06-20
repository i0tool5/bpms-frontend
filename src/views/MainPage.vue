<template>
  <div class="login-box">
    <h2 style="text-align: center;">Пожалуйста, авторизуйтесь</h2>
    <form action="POST" @submit.prevent="sendForm">
      <div class="login">
        <div>
          <label for="username"><b>Имя пользователя</b></label>
          <input v-model="creds.username" id="username" type="text" placeholder="Введите имя пользователя" required>
        </div>
        <div>
          <label for="password"><b>Пароль</b></label>
          <input v-model="creds.password" type="password" placeholder="Введите пароль" required>
        </div>
        <div v-show="error">
          <span class="error">Неверный логин/пароль</span>
        </div>
        <input type="submit" value="Отправить">
      </div>
    </form>
    <div class="unexpected-error-box pad-05 text-center"
      v-show="unexpecterErr">
      <div>
        Произошла непредвиденная ошибка. Пожалуйста, попробуйте позднее.
      </div>
    </div>
  </div>
</template>

<script>
import RequestsMixin from '@/components/mixins/RequestsMixin'
export default {
  name: 'MainPage',
  data () {
    return {
      error: false,
      unexpecterErr: false,
      creds: {
        username: '',
        password: ''
      }
    }
  },
  beforeMount () {
    if (this.$store.getters.auth) {
      this.$router.back()
    }
  },
  mixins: [
    RequestsMixin
  ],
  methods: {
    showError: function () {
      this.unexpecterErr = true
      setTimeout(() => { this.unexpecterErr = false }, 7000)
    },
    sendForm: function () {
      this.postReq('/login', this.creds)
        .then(resp => {
          if (resp.status === 400) {
            this.error = true
            return {}
          } else {
            return resp.json()
          }
        }).then(json => {
          if (json.token) {
            this.$store.commit('login', json.token)
            this.$router.replace('/profile')
          }
        }).catch(err => {
          this.showError()
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>

.error {
  color: rgba(255, 0, 0, .6);
  font-size: 13px;
}

.login-box {
  width: 50%;
  position: relative;
  margin: 0 auto;
  top: 10em;
}

.login {
  width: 100%;
  border: 2px solid #32BBDB;
  padding: 1em;
  border-radius: .5em;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

input[type=submit] {
  background-color: #32BBDB;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

input[type=submit]:hover {
  opacity: 0.8;
}

@media only screen and (max-width: 600px)  {
  .login-box {
    width: 90%;
  }
  .login {
    border: none;
    padding: 0;
  }
}

</style>
