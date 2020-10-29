<template>
  <div class="mybg" >

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

      <form class="login" @submit.prevent="login">
        <div class="input-group form-group">
          <div class="input-group-prepend">

            <span class="input-group-text"><i class="fa fa-user"></i></span>
          </div>
          <input v-model="email" type="text" class="form-control" placeholder="username">

        </div>
        <div class="input-group form-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-key"></i></span>
          </div>
          <input v-model="password" type="password" class="form-control" placeholder="password">
        </div>

      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$bvModal.show("modal-center");
  },
  name: "Login",

  data(){
    return {
      email : "",
      password : ""
    }
  },

  methods: {
    login: function (bvModalEvt) {
      bvModalEvt.preventDefault()
    //  console.log('sadsdafsdf')
      let email = this.email
      let password = this.password
      this.$store.dispatch('Authentication/login', { email, password })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))

    // console.log('ne bili', localStorage.getItem('token'))
     // this.$router.go(1);
    //  this.$forceUpdate()

    }
  }



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





</style>
