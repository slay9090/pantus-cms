<template>
  <div class="brandedit">
    <h1>This is an about p11age</h1>
    <div>$route.query: {{$route.query}}</div>
    <div>query: {{query}}</div>

    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group id="input-group-1" label="ID:" label-for="input-1">
          <b-form-input
              readonly
              id="input-1"
              v-model="form.id"
              required

          ></b-form-input>
        </b-form-group>


        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
          <b-form-input
              id="input-2"
              v-model="form.name"
              required
              placeholder="Enter brand name"
              autofocus
          ></b-form-input>
        </b-form-group>

        <b-row class="button-group justify-content-between mt-4 mt-xl-0" align-v="end" >
          <b-col  >
            <b-row class="unsave-button " cols-xl="2" align-v="end">
              <b-col order="1" class="" xl="auto">
                <b-button type="submit" variant="danger" class="">Удалить</b-button>
              </b-col>
              <b-col order="2" xl="auto" class="mt-3">
                <b-button type="reset" variant="secondary"  class="">Сбросить</b-button>
              </b-col>
            </b-row>
          </b-col>

          <b-col   class="text-right" >
            <b-button type="submit" variant="primary" class="">Сохранить</b-button>
          </b-col>
        </b-row>

      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>


  </div>
</template>

<script>
export default {
  props: ["query"],

  data() {
    return {
      form: {
        id: '',
        name: '',
      },
      show: true
    }

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      //this.form.id = ''
      this.form.name = ''

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },

  async mounted() {
      await this.$store.dispatch("CatalogBrands/getDataAllItems");
      let data =  await this.$store.getters["CatalogBrands/itemById"](Number(this.query)); // getTodoById(Number(this.query))
      this.form.name = data.name;
      this.form.id = data.id;
  }

};
</script>

