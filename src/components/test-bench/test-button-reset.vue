<template>
<div class="">
  <base-button id="dsasda" @click="console" @focus="consoleFocus" @mouseenter="consoleFocus"></base-button>
</div>
</template>

<script>
export default {



  name: "test-button-reset",
  methods: {
    console() {
      console.log("привет мир!")
    },
    consoleFocus() {
      console.log("привет фокус!")
    }
  }

}
</script>

<style scoped>

</style>