<template>
  <b-form-input
      v-model="valueNewsSearchInput"
      type="search"
      :size="size"
      :placeholder="placeholder"
      :state="isValid"
      :debounce="debounce"
      v-on="$listeners"


  >

  </b-form-input>

</template>

<script>
export default {
  name: "search-input",
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
      default: 'Search',
    },
    debounce: {
      type: String,
      default: '500'
    },

  },

  data(){
    return{
      isValid: null,
    }
  },

  computed: {

    valueNewsSearchInput: {
      get() {
        //console.log()
       // console.log('GETTER BASE COMP', this.$store.getters["BaseComponents/getValueInputSearch"](this.id))
        return this.$store.getters["BaseComponents/getValueInputSearch"](this.id)
      },
      set(val) {
        //запустить валидацию

        this.valid(val)

        this.$store.commit('BaseComponents/setValueInputSearch', {'key': this.id, 'value': val})
        val === 'q' ? this.isValid=false : this.isValid=null

      },

    }

  },
  methods: {
    valid(val){
     // console.log('VALIDA ', val)
    }
  },

}
</script>

<style scoped>

</style>