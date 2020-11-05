<template>
  <div class="mybg">

    <b-modal
        id="modal-center"
        centered
        title="Авторизация"
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        ok-only
        ok-title="Войти"
        no-fade
        @ok="login"


    >

      <form class="login" @submit.prevent="login" autocomplete="off">
        <div class="input-group form-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-user"></i></span>
          </div>

          <input v-model="email" type="text" class="form-control" placeholder="username" >

        </div>
        <div class="input-group form-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-key"></i></span>
          </div>

          <input v-model="password" type="password" class="form-control" placeholder="password">

        </div>
        <captcha :checkRecaptcha.sync="checkRecaptcha" :getError.sync="getError"  />
      </form>
    </b-modal>
  </div>
</template>

<script>
 import captcha from "@/components/captcha";
 import checkCaptcha from "@/mixins/forms/captcha"

export default {
  name: "Login",
  mixins:[checkCaptcha,],

  components: {
    captcha,
  },

  data(){
    return {
      email : "",
      password : "",
    }
  },

  methods: {
    login: function (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.checkValidateRecaptcha();
      if(this.checkRecaptcha === false){
        return;
      }
      let login = this.email
      let password = this.password
      this.$store.dispatch('Authentication/login', { login, password })
          .then(() => this.$router.push('/'))
          .catch(err => console.log('err ',err))

    }
  },

  mounted() {

    this.$store.getters["Authentication/isLoggedIn"] ?
        this.$router.push('/') :
        this.$bvModal.show("modal-center");
  },

}
</script>

<style >



  /* Made with love by Mutiullah Samim*/

#modal-center{
  background-image: url('http://getwallpapers.com/wallpaper/full/d/c/9/57345.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center top;
  height: 100%;
  font-family: 'Numans', sans-serif;
}

.input-group-prepend span{
  width: 40px;
  background-color: #FFC312;
  color: black;
  border:0 !important;
}

  #modal-center___BV_modal_body_ > form > div:nth-child(3) > p {
    color: red;
    font-size: 14px;
    font-family: Roboto,helvetica,arial,sans-serif;
  }

  .form-control {


    font-size: 18px;
    font-family: Roboto,helvetica,arial,sans-serif;
  }





</style>
