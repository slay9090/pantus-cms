<template>
  <b-container fluid>



    <b-row >

      <b-col class="mb-3 mb-lg-0" md="6">

        <b-card header-tag="header">
          <template #header>
            <h4><small class="text-muted">Редактирование статьи</small></h4>
          </template>

          <b-card-text>

            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

              <b-form-group id="input-group-1" label="ID:" label-for="news-articles-edit-id-input">
                <input-index
                    id="news-articles-edit-id-input"
                    readonly
                />
              </b-form-group>

              <b-form-group id="input-group-2" label="Заголовок:" label-for="news-article-edit-name-input">
                <input-text id="news-article-edit-name-input"
                            placeholder="Заголовок"
                />
              </b-form-group>

              <b-form-group id="input-group-description" label="Описание:" :label-for="descriptionInputId">
                <text-area
                    :id="descriptionInputId"
                    placeholder="Описание"
                    :rows="3"
                    :max-rows="0"
                    :min-length="10"
                />
              </b-form-group>

              <b-form-group id="input-group-brand" label="Категория:" :label-for="categoriesNewsId">
                <input-catalog

                    v-if="allNewsCategories"

                    :id="categoriesNewsId"
                    type-catalog="singleSelect"
                    :items="allNewsCategories"
                    modal-id="modal-news-categories-select"
                    modal-title-name="Выбор категории статьи"
                >
                  <router-link v-if="formData.newsCategories" :to="'/news/category/edit?id='+formData.newsCategories.id">
                    {{ formData.newsCategories.name }}
                  </router-link>
                </input-catalog>
              </b-form-group>



              <b-form-group id="body" label="Статья:" label-for="news-article-edit-html-editor">
                <editor-html
                    id="news-article-edit-html-editor"
                />
              </b-form-group>

              <b-form-group id="tags" label="Тэги:" label-for="news-article-edit-tags">
                <vue-tags-input
                    class="tags-input"
                    id="news-article-edit-tags"
                    v-model="tag"
                    :tags="tags"
                    @tags-changed="newTags => tags = newTags"
                    :maxlength="40"
                    placeholder="Добавте тэги"

                />

              </b-form-group>


              <b-form-group label="Активная:" v-slot="{ ariaDescribedby }" >

                  <b-row align-h="start">
                    <b-col cols="1"  class="mr-4"><b-form-radio v-model="activity" :aria-describedby="ariaDescribedby" name="some-radios" :value="true">Да</b-form-radio></b-col>
                    <b-col cols="1" > <b-form-radio v-model="activity" :aria-describedby="ariaDescribedby" name="some-radios" :value="false">Нет</b-form-radio></b-col>
                  </b-row>

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
        <b-card header-tag="header">
          <template #header>
            <h4><small class="text-muted">Изображение в заголовке</small></h4>
          </template>
          <b-card-text>

            <b-form-group id="input-group-title-images" label="Image:" label-for="image-carousel-news-edit">


              <image-carousel
                  id="image-carousel-news-edit"
                  v-if="initDataSet.preview"
                  :images="formData.previewImage"
                  heigh-block="200"
              />

            </b-form-group>


            <image-manager
                v-if="initDataSet.preview"
                :id="imageManagerId"
                modal-id="news-edit-image-preview"
                :images="[initDataSet.preview.image]"
            >
              <template #btn>
                <b-button >Выбрать</b-button>
                <!--              <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" ></i>-->
              </template>
            </image-manager>

          </b-card-text>
        </b-card>
      </b-col>

    </b-row>





<!--    -->



  </b-container>
</template>

<script>
import baseComponentsMixin from '@/mixins/base-components/inputs'
import ImageManager from "@/components/images-manager/index";
import ImageCarousel from "@/components/image-carousel";
import VueTagsInput from '@johmun/vue-tags-input';
import InputCatalog from "@/components/catalog/input-catalog";



//import TitleImages from "@/components/news/title-images";


export default {
  components: {ImageCarousel, ImageManager, VueTagsInput, InputCatalog},
  props: ["query"],
  mixins: [baseComponentsMixin],
  name: "FormEdit",



  data() {
    return {

      show: true,
      imageManagerId: 'file-manager-news-edit',
      descriptionInputId: 'news-article-edit-description-input',
      categoriesNewsId: 'news-categories-select',
      tag: '',
      tags: [],
      activity: true,
    //  initDataSet: null,
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
      const title = this.$store.getters["BaseComponents/getValueInputText"]('news-article-edit-name-input');
      const newsCategories = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.categoriesNewsId)
      const content = this.$store.getters["BaseComponents/getValueHtmlEditor"]('news-article-edit-html-editor');
      const previewImage = this.$store.getters["NewFileManager/getCurrentFiles"](this.imageManagerId);
      const tags = this.tags.map(item => item.text);
      const activity = this.activity;

      return {id, title, previewImage, newsCategories, content, tags, activity }
    },

    initDataSet() {
     return  this.$store.getters["NewsArticles/AllItems"]
    },

    allNewsCategories(){
      return this.$store.getters['NewsCategory/AllItems']
    },


  },

  async mounted() {
    await this.$store.dispatch("NewsArticles/GetDetalail", this.query);
    await this.$store.dispatch('NewsCategory/GetData')

    this.$store.commit('BaseComponents/setValueInputText', {'key': 'news-article-edit-name-input', 'value': this.initDataSet.name})
    this.$store.commit('BaseComponents/setValueTextArea', {'key': this.descriptionInputId, 'value': this.initDataSet.preview.text})
    this.$store.commit('BaseComponents/setValueInputIndex', {'key': 'news-articles-edit-id-input', 'value': this.initDataSet.id})
    this.$store.commit('BaseComponents/setValueHtmlEditor', {'key': 'news-article-edit-html-editor', 'value': this.initDataSet.content})
    this.$store.commit('TempDataCatalog/setValueInputCatalog', {'key': this.categoriesNewsId, 'value': this.initDataSet.category})
    this.activity = this.initDataSet.activity !== 'true'

  },

}
</script>

<style scoped>
/*#news-article-edit-tags {*/
/*  max-width: none;*/
/*}*/

.tags-input{
  max-width: 100% !important;
}
</style>
