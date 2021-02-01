<template>
  <div class="price-input ">
  <b-form-input
      v-model="valueInputText"
      type="text"
      :size="size"
      :placeholder="placeholder"
      :state="isValid"
      :aria-describedby="id+'-feedback'"
      required
  >
  </b-form-input>

    <b-form-invalid-feedback :id="id+'-feedback'" class="mb-3">
      {{textFailValidations}}
    </b-form-invalid-feedback>
<!--    <span class="text-fail-validations"></span>-->
  </div>
</template>

<script>
export default {
  name: "price-input",

  props: {
    id: {
      type: String,
      required: true,
    },

    size: {
      validator(value) {
        return ['', 'sm', 'lg'].indexOf(value) !== -1
      },
      default: '',
    },

    placeholder: {
      type: String,
      default: 'Текст',
    },

  },

  data(){
    return{
      isValid: null,
      textFailValidations: null,
    }
  },

  computed: {
    valueInputText: {
      get() {
        return this.$store.getters["BaseComponents/getValueInputPrice"](this.id)
      },
      set(val) {
        //запустить валидацию
        this.checkIsIncorrectValue(val) ? this.isValid = false : this.isValid = null

        this.$store.commit('BaseComponents/setValueInputPrice', {key: this.id, value: val})

      },

    }
  },

  methods: {
    /// • В поле можно вводить только цифры.
    checkIsNumbersValue(text) {
      this.textFailValidations = 'В поле можно вводить только цифры';
      return (!/^[0-9/.]+$/.test(text.trim()));
    },
    /// • Недопустимые символы нельзя ни вводить, ни вставлять из буфера обмена Price:
    checkIsIncorrectValue(text) {
    //  /youregexp/.test(yourString)
      this.textFailValidations = 'Недопустимые символы';
      return (!/^$|^\d+$/.test(text.trim())); // только положительные цифры
    },


    // • При завершении редактирования (когда поле теряет фокус ввода) значение должно форматироваться как валюта RUB:
    //   разряды отделены запятыми, в начале стоит знак доллара ($12,123,343.25)
    priceTextFormatOutFocus(text) {


    },
    // • При редактировании значения поля его содержимое отображается и вводится как число (12123343.25)
    priceTextFormatInFocus(text) {

    }


  },


}
</script>

<style scoped>
  .text-fail-validations{
    display: block;
    margin-bottom: 1rem;
  }
</style>