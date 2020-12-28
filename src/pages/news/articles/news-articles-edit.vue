<template>
  <div>

    <div class="d-flex align-items-start">

      <div class="card col-6 p-0  mr-5 shadow" id="tbl">
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
                    placeholder="Добавте тэг"

                />

              </b-form-group>


              <b-form-group label="Активная:" v-slot="{ ariaDescribedby }" >
                <b-container class="b-cont">
                  <b-row align-h="start">
                    <b-col cols="1"><b-form-radio v-model="activity" :aria-describedby="ariaDescribedby" name="some-radios" :value="true">Да</b-form-radio></b-col>
                    <b-col cols="1"> <b-form-radio v-model="activity" :aria-describedby="ariaDescribedby" name="some-radios" :value="false">Нет</b-form-radio></b-col>
                  </b-row>
                </b-container>
              </b-form-group>

              <b-button type="submit" variant="danger" class="">Удалить</b-button>
              <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
              <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>
            </b-form>

          </div>

        </div>
      </div>

      <div class=" card col-3 p-0   shadow">
        <h4 class="card-header"><small class="text-muted">Изображение в заголовке</small></h4>
        <div class="card-body ">

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


        </div>
      </div>


    </div>

  </div>
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
#news-article-edit-tags {
  max-width: none;
}
</style>
