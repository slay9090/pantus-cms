<template>
  <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
  >
    Default Alert

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
      console.log('alert comp');
      this.showDismissibleAlert = true
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