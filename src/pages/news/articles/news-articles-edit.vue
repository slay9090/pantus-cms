<template>
  <div>

    <div class="d-flex align-items-start">

      <div class="card col-7 p-0  mr-5 shadow" id="tbl">
        <h4 class="card-header"><small class="text-muted">Редактирование статей</small></h4>
        <div class="card-body">

          <div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

              <b-form-group id="input-group-1" label="ID:" label-for="news-articles-edit-id-input">
                <input-index
                    id="news-articles-edit-id-input"
                    readonly
                />
              </b-form-group>

              <b-form-group id="input-group-2" label="Name:" label-for="news-article-edit-name-input">
                <input-text id="news-article-edit-name-input"
                            placeholder="Заголовок"
                />
              </b-form-group>



              <b-form-group id="body" label="body:" label-for="news-article-edit-html-editor">
                <editor-html
                    id="news-article-edit-html-editor"
                />
              </b-form-group>

              <b-button type="submit" variant="danger" class="">Удалить</b-button>
              <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
              <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>
            </b-form>

          </div>

        </div>
      </div>

<!--      <preview-request-body-->
<!--          :data=formData-->
<!--      />-->

<!--      <title-images-->
<!--          id="news-article-edit"-->
<!--          modal-id="modal-news-article-edit"-->
<!--      />-->


      <div class="d-flex card col-4 p-0 ml-5 shadow">
        <h4 class="card-header"><small class="text-muted">Изображение в заголовке</small></h4>
        <div class="card-body d-flex">

<!--          <b-form-group id="input-group-title-images" label="Image:" :label-for="id">-->
<!--            <image-carousel-->
<!--                :id="id"-->
<!--                :modal-id="modalId"-->
<!--            />-->
<!--          </b-form-group>-->
          <image-manager
          id="xxx"
          modal-id="xxx"
          >
            <template #btn>
            <b-button >asdasd</b-button>
<!--              <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" ></i>-->
            </template>
          </image-manager>


        </div>
      </div>


    </div>

  </div>
</template>

<script>
import baseComponentsMixin from '@/mixins/base-components/inputs'
import ImageManager from "@/components/images-manager/index";
//import TitleImages from "@/components/news/title-images";


export default {
  components: {ImageManager},
  props: ["query"],
  mixins: [baseComponentsMixin],
  name: "FormEdit",



  data() {
    return {
      show: true,
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()

      this.$_inputCleaned(this.inputType.text,'news-article-edit-name-input')
      this.$_inputCleaned(this.inputType.htmlEditor,'news-article-edit-html-editor')
      // Trick to reset/clear native browser form validation state

      this.show = false
      this.$nextTick(() => {
        this.show = true

      })
    },
  },

  computed: {

    formData() {
      const id = this.$store.getters["BaseComponents/getValueInputIndex"]('news-articles-edit-id-input');
      const name = this.$store.getters["BaseComponents/getValueInputText"]('news-article-edit-name-input');
      const content = this.$store.getters["BaseComponents/getValueHtmlEditor"]('news-article-edit-html-editor');
      const form = {id, name, content}
      return form
    },

  },

  async mounted() {
    await this.$store.dispatch("NewsArticles/GetDetalail", this.query);
    let data = await this.$store.getters["NewsArticles/AllItems"]; // getTodoById(Number(this.query))

    this.$store.commit('BaseComponents/setValueInputText', {'key': 'news-article-edit-name-input', 'value': data.name})

    this.$store.commit('BaseComponents/setValueInputIndex', {'key': 'news-articles-edit-id-input', 'value': data.id})

    this.$store.commit('BaseComponents/setValueHtmlEditor', {'key': 'news-article-edit-html-editor', 'value': data.content})




  },

}
</script>

<style scoped>

</style>
