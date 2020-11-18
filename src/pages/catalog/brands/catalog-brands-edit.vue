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



        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger" class="mx-2">Reset</b-button>
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

