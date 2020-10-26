<template>
  <div class="mybg" >

    <b-modal
        id="modal-center"
        centered
        title="Ошибка"
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        ok-only
        ok-title="Назад"
        no-fade
        @ok="login"



    >
     404
    </b-modal>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$bvModal.show("modal-center");
  },
  name: "ClientError",

  data(){
    return {
      email : "",
      password : ""
    }
  },

  methods: {
    login: function (bvModalEvt) {
      bvModalEvt.preventDefault()

      //this.$router.push('/')
      this.$router.go(-1)

    }
  }



}
</script>

<style >



/* Made with love by Mutiullah Samim*/

#modal-center{

  display: none;
  background-color: #6c757d;
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
