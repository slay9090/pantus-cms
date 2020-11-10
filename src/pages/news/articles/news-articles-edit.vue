<template>
  <div>

    <div class="d-flex align-items-start">

      <div class="card col-7 p-0  mr-5" id="tbl">
        <h4 class="card-header"><small class="text-muted">Редактирование статей</small></h4>
        <div class="card-body">

          <div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

              <b-form-group id="input-group-1" label="ID:" label-for="news-articles-edit-id-input">
                <index-input
                    id="news-articles-edit-id-input"
                    readonly
                />

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

              <b-form-group v-if="content" id="body" label="body:" label-for="bodytext">

                <html-editor
                id="news-article-edit-html-editor"
                :content="content"
                />

              </b-form-group>


              <b-button type="submit" variant="danger" class="">Удалить</b-button>
              <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
              <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>
            </b-form>

          </div>

        </div>
      </div>


      <preview-request-body
      :data = preViewRequestBody
      />

    </div>

  </div>
</template>

<script>

export default {
props: ["query"],
name: "FormEdit",

  components: {
  },

  data() {
    return {
      form: {
        id: '',
        name: '',
        content: '',
      },
      show: true,
      content: '',
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()

      this.form.name = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },

  computed: {
    newsIndex(){
      return this.$store.getters["BaseComponents/getValueInputIndex"]('news-articles-edit-id-input')
    },

    preViewRequestBody(){
      const id = this.$store.getters["BaseComponents/getValueInputIndex"]('news-articles-edit-id-input')
      const name = this.form.name
      const content = this.$store.getters["BaseComponents/getValueHtmlEditor"]('news-article-edit-html-editor')
      const form = {id, name, content}
      return form
    },

  },

  async mounted() {
    await this.$store.dispatch("NewsArticles/GetDetalail", this.query );
    let data = await this.$store.getters["NewsArticles/AllItems"]; // getTodoById(Number(this.query))

    this.form.name = data.name;
    // Устанавливаем значение идентификатора во вьюкс, ид инпута, значение
    this.$store.commit('BaseComponents/setValueInputIndex', {'key': 'news-articles-edit-id-input', 'value': data.id})

    this.content= data.content;


  },

}
</script>

<style scoped>

</style>
