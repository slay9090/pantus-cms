<template>
  <div>
<!--    <p class="error mt-2 mb-0" v-if="getError === true">{{ textError }}  </p>-->
    <vueRecaptcha
        sitekey="6LdMI94ZAAAAADQt2xBdUxgnhr0QpnezUwkcqiHV"
        :loadRecaptchaScript="true"
        @verify="registerTrue"
    >
    </vueRecaptcha>

  </div>
</template>
<script>

import vueRecaptcha from "vue-recaptcha";

export default {
  name: 'captcha',
  props: {
    getError: {
      type: Boolean,
      required: true,
    },
    checkRecaptcha: {
      type: Boolean,
      required: true,
    },
    textError: {
      type: String,
      default: "Докажите, что вы не БОТ"
    }
  },
  components: {
    vueRecaptcha,
  },
  methods: {
    registerTrue() {
      this.$emit("update:checkRecaptcha", true);
      this.$emit("update:getError", false);
      // this.$emit("update:getError", false);
    }
  },
  // destroyed() {
  //   console.log('DESTRO CAPTHA')
  //   window.recaptcha.reset()
  // }
};
</script>
