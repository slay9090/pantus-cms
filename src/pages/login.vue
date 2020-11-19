<template>
  <div class="mybg login-page  d-flex justify-content-center align-items-center">

    <div class="login-page__form px-4 py-3 d-flex justify-content-center shadow">

      <b-form @submit="login" class="align-items-center" @keyup.enter="login">

        <span class="d-block mb-3">Авторизация</span>
        <hr>
        <b-form-group id="input-group-username-input" label-for="username-input">
          <div class="input-group form-group" id="username-input">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fa fa-user "></i></span>
            </div>
            <b-form-input v-model="email" type="text" class="form-control" placeholder="username"
                          required></b-form-input>
          </div>
        </b-form-group>

        <b-form-group id="input-group-password-input" label-for="password-input">
          <div class="input-group form-group" id="password-input">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fa fa-key "></i></span>
            </div>
            <b-form-input v-model="password" type="password" class="form-control" placeholder="username" required
                          ref="input-password"></b-form-input>
          </div>
        </b-form-group>

        <captcha :checkRecaptcha.sync="checkRecaptcha" :getError.sync="getError"/>

        <hr>
        <div class="mt-3 d-flex d-flex d-flex justify-content-between align-items-center">
          <span class="login-page__form__text-error text-break text-wrap font-weight-light">{{ textErrLogIn }}</span>
          <b-button type="submit" variant="primary">Войти</b-button>
        </div>

      </b-form>

    </div>

  </div>
</template>

<script>
import captcha from "@/components/captcha";
import checkCaptcha from "@/mixins/forms/captcha";

export default {
  name: "Login",
  mixins: [checkCaptcha,],

  components: {
    captcha,
  },

  data() {
    return {
      email: "",
      password: "",
      textErrLogIn: null,
    }
  },

  methods: {


    login: function (evt) {

      evt.preventDefault()
      this.checkValidateRecaptcha();
      this.$refs["input-password"].focus()
      if (this.checkRecaptcha === false) {
        this.textErrLogIn = 'Подтвердите что вы не робот'
        return;
      }
      let login = this.email
      let password = this.password
      this.$store.dispatch('Authentication/login', {login, password})

          .catch(err =>
                  console.log('err ', err),
              this.textErrLogIn = 'Ошибка имени или пароля',
          )

      this.checkRecaptcha = false
      window.grecaptcha.reset()

    }
  },

  created() {
    this.$store.getters["Authentication/isLoggedIn"] ?
        this.$router.push('/') :
        null;
  },

}
</script>

<style scoped>

.login-page {
  height: 100vh;
  background-image: url('http://getwallpapers.com/wallpaper/full/d/c/9/57345.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center top;
  font-family: 'Numans', sans-serif;
}

.login-page__form {

  background: linear-gradient(90deg, #b9deed, #efefef);
  border-radius: 10px;
}

.login-page__form__text-error {
  color: red;
  display: block;
  width: 230px;
  font-size: 0.8em;

}

.input-group-prepend span {
  width: 40px;
  background-color: #FFC312;
  color: black;
  border: 0 !important;
  font-size: 1.3em;
}

.form-control {
  background-color: #F9F9F9;
}

input:-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
}


</style>
