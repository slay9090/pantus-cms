<template>
  <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="alertMessages.type"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      class="shadow"
  >
    {{alertMessages.text}}
  </b-alert>
</template>

<script>
export default {
name: "index",
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  computed:{
    alertMessages(){
      return this.$store.getters["AlertMessages/alert"]
    },
  },
  watch:{
    alertMessages(){
      window.scrollTo(0,0)
      this.showAlert();
      return this.$store.getters["AlertMessages/alert"]
    },
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  },


}
</script>

<style scoped>

</style>