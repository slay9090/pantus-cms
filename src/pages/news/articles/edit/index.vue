<template>
  <b-container fluid>

    <b-overlay :show="initFailed" no-fade rounded="sm">

    <b-row v-if="!initFailed">

      <b-col class="mb-3 mb-lg-0" md="6">

        <b-card header-tag="header">
          <template #header>
            <h4><small class="text-muted">Редактирование статьи</small></h4>
          </template>

          <b-card-text>

            <ValidationObserver >

              <b-form @submit.prevent="validate().then(onSubmit(valid, ))" slot-scope="{ validate, valid, }" class="order-form">


              <BTextInput
                  rules="required|integer|min_value:1"
                  type="number"
                  label="Id:"
                  name="index"
                  v-model="newsDetails.id"
                  placeholder=""
                  readonly
              />

                <BTextInput
                    rules="required|max:60"
                    type="text"
                    label="Заголовок:"
                    name="title"
                    v-model="newsDetails.name"
                    placeholder=""

                />

                <BTextArea
                    rules="required|max:60"
                    type="text"
                    label="Описание:"
                    name="descriptions"
                    v-model="newsDetails.preview.text"
                    placeholder=""
                    :rows="4"

                />

                <BSelect
                    rules=""
                    name="categories"
                    label="Категория:"
                    v-model="newsDetails.category.id"
                >
                  <b-form-select-option v-for="(item, index) in allNewsCategories" :key="index" :value="item.id">
                    {{ item.name }}
                  </b-form-select-option>
                </BSelect>


                  <BHtml
                      rules="required"
                      name="content"
                      label="Контент:"
                      v-model="newsDetails.content"
                  />


                <BTagsInput
                    rules="required"
                    name="tags"
                    :maxlength="40"
                    :items.sync="newsDetails.tags"
                />

                <BRadio
                    name="active"
                    rules="required"
                    label="Активна:"
                    v-model="newsDetails.activity"
                >
                  <b-form-radio size="lg" :value="true" >Да</b-form-radio>
                  <b-form-radio size="lg" :value="false">Нет</b-form-radio>
                </BRadio>


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

            </ValidationObserver >

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
                  :images="newsDetails.preview.image"
                  heigh-block="200"
              />

            </b-form-group>


            <image-manager
                :id="imageManagerId"
                modal-id="news-edit-image-preview"
                :images.sync="newsDetails.preview.image"
            >
              <template #btn>
                <b-button >Выбрать</b-button>
              </template>
            </image-manager>

          </b-card-text>
        </b-card>
      </b-col>

    </b-row>





<!--    -->


    </b-overlay>
  </b-container>
</template>

<script>
import baseComponentsMixin from '@/mixins/base-components/inputs'
import ImageManager from "@/components/images-manager/index";
import ImageCarousel from "@/components/image-carousel";

import InputCatalog from "@/components/catalog/input-catalog";
import init from "./init";



//import TitleImages from "@/components/news/title-images";


export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {ImageCarousel, ImageManager, InputCatalog},
  props: ["query"],
  mixins: [baseComponentsMixin, init],
  name: "FormEdit",



  data() {

    return {
      show: true,
      imageManagerId: 'file-manager-news-edit',
      descriptionInputId: 'news-article-edit-description-input',
      categoriesNewsId: 'news-categories-select',
      tags: [],
    }
  },
  methods: {




    onSubmit(isValid) {
      !isValid ? this.$globalFunc.setAlertMessage('danger', 'Некорректно заполнена форма')
          : this.$globalFunc.setAlertMessage('success', 'Выполнено успешно')
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

    // formData() {
    //   const id = this.$store.getters["BaseComponents/getValueInputIndex"]('news-articles-edit-id-input');
    //   const title = this.$store.getters["BaseComponents/getValueInputText"]('news-article-edit-name-input');
    //   const newsCategories = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.categoriesNewsId)
    //   const content = this.$store.getters["BaseComponents/getValueHtmlEditor"]('news-article-edit-html-editor');
    //   const previewImage = this.$store.getters["NewFileManager/getCurrentFiles"](this.imageManagerId);
    //   const tags = this.tags.map(item => item.text);
    //   const activity = this.activity;
    //
    //   return {id, title, previewImage, newsCategories, content, tags, activity }
    // },

    initDataSet() {
     return  this.$store.getters["NewsArticles/AllItems"]
    },

    allNewsCategories(){
      return this.$store.getters['NewsCategory/AllItems']
    },

    tagsInput(){
      return this.tags.map(item => item.text);
    },

    newsDetails:{
      get(){return this.$store.getters["NewsArticles/getNewsItemDetails"]},
      set(val){this.$store.commit('NewsArticles/setNewsItemDetails', val)}
    }


  },

 async mounted() {
   await this.dataInit();
    console.log('xxx' ,this.newsDetails)
    // this.activity = this.initDataSet.activity !== 'true'

  },

}
</script>

<style scoped>
/*#news-article-edit-tags {*/
/*  max-width: none;*/
/*}*/


</style>
