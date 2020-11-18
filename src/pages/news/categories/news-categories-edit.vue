<template>
<div class="bloсk-form-edit row  align-items-start">

    <div class="bloсk-form-edit__card card col-5 px-0 ml-3 shadow">
      <h4 class="bloсk-form-edit__card-header card-header"><small class="text-muted">Редактирование товар</small></h4>
      <div class="bloсk-form-edit__card-body card-body">

          <b-form @submit="onSubmit" @reset="onReset" >

            <b-form-group id="input-group-product-id" label="ID:" label-for="news-categories-edit-id-input">
              <input-index id="news-categories-edit-id-input" readonly />
            </b-form-group>




            <b-form-group id="input-group-product-name" label="Название:" label-for="news-categories-edit-name-input">
              <input-text id="news-categories-edit-name-input" />
            </b-form-group>

            <b-form-group id="input-group-product-slug" label="Код:" label-for="news-categories-edit-slug-input">
              <input-slug
              id="news-categories-edit-slug-input"
              target-id="news-categories-edit-name-input"
              />
            </b-form-group>


            <b-button type="submit" variant="danger" class="">Удалить</b-button>
            <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
            <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>

          </b-form>

      </div>
  </div>

  <preview-request-body
  :data="formData"
  />

</div>
</template>

<script>
export default {
name: "news-categories-edit",
  props: ["query"],
  computed: {

    formData() {
      const id = this.$store.getters["BaseComponents/getValueInputIndex"]('news-categories-edit-id-input');
      const name = this.$store.getters["BaseComponents/getValueInputText"]('news-categories-edit-name-input');
      const code = this.$store.getters["BaseComponents/getValueInputSlug"]('news-categories-edit-slug-input')
      const form = {id, name, code}
      return form
    },

  },


  methods: {

    onSubmit(evt) {
      evt.preventDefault()
     alert(JSON.stringify(this.formData))
    },

    onReset(evt) {
      evt.preventDefault()
      this.$store.commit('BaseComponents/setValueInputText',
          {'key': 'news-categories-edit-name-input', 'value': null}
          )
      this.$nextTick(() => {
        //this.show = true
      })
    },
  },

  async mounted() {
    await this.$store.dispatch("NewsCategory/GetData");
    let data = await this.$store.getters["NewsCategory/itemById"](this.query);
    this.$store.commit('BaseComponents/setValueInputIndex', {'key': 'news-categories-edit-id-input', 'value': data.id})
    this.$store.commit('BaseComponents/setValueInputText', {'key': 'news-categories-edit-name-input', 'value': data.name})
  },




}
</script>

<style scoped>

</style>