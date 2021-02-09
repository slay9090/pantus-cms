<template>

  <b-container fluid>


    <b-row>

      <b-col class="mb-3 mr-lg-5 mb-lg-0" md="6" lg="5">

        <b-card header-tag="header" class="shadow">
          <template #header>
            <h4><small class="text-muted">Редактирование статьи</small></h4>
          </template>

          <b-card-text>

            <b-form @submit="onSubmit" @reset="onReset">

              <b-form-group id="input-group-product-id" label="ID:" label-for="news-categories-edit-id-input">
                <input-index id="news-categories-edit-id-input" readonly/>
              </b-form-group>


              <b-form-group id="input-group-product-name" label="Название:" label-for="news-categories-edit-name-input">
                <input-text id="news-categories-edit-name-input"/>
              </b-form-group>

              <b-form-group id="input-group-product-slug" label="Код:" label-for="news-categories-edit-slug-input">
                <input-slug
                    id="news-categories-edit-slug-input"
                    target-id="news-categories-edit-name-input"
                />
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

          </b-card-text>

        </b-card>

      </b-col>


      <b-col md="3">
        <b-card header-tag="header" class="shadow">
          <template #header>
            <h4><small class="text-muted">Изображение в заголовке</small></h4>
          </template>
          <b-card-text>
            <pre class="m-0">{{ formData }}</pre>
          </b-card-text>
        </b-card>
      </b-col>

    </b-row>


  </b-container>
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
    this.$store.commit('BaseComponents/setValueInputText', {
      'key': 'news-categories-edit-name-input',
      'value': data.name
    })
  },


}
</script>

<style scoped>
.unsave-button .btn {
  min-width: 100px !important;
}
</style>