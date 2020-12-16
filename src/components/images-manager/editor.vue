<template>
<div>
  <div class="align-center d-flex justify-content-between align-items-center">

    <div class="text-center align-center h-100 mt-3 mb-0">Выгруженных: {{currentImages.length}} шт. </div>



    <label class="file-select mt-3 mb-0 ">
      <!-- We can't use a normal button element here, as it would become the target of the label. -->
      <div class="btn btn-outline-danger  " @click="resetSelectedImages">
        <!-- Display the filename if a file has been selected. -->

        <span >Сбросить</span>
      </div>
      <!-- Now, the file input that we hide. -->

    </label>
  </div>
  <hr>


  <div class="scrollblock">
<!--    {{metaDataInfoImg}}-->
    <div v-if="!metaDataInfoImg.complite"  class="h-100"> <loading v-if="metaDataInfoImg[0]"></loading> <span v-else>Нет изображений</span> </div>
    <div v-else class="" v-for="(image, key ) in metaDataInfoImg" :key="key">

      <div class="d-flex" >
        <div class="imagecontain col-7 ">
          <img class="preview" :src="image[0]"  @error="replaceByDefault" />

        </div>
        <div class="col-4 property-image-block">
<!--          {{image}}-->

          <div v-if="image[1]" class="row  text-break border-bottom property-image-block__text-limit" :title="image">  {{image[1]}}    </div>
          <div v-if="image[2]" class="row border-bottom"> {{image[3]  }}</div>
          <div v-if="image[3]" class="row border-bottom"> {{ (parseInt(image[2])/1024).toFixed(2) + " kb" }} </div>

          <div class="row  align-center justify-content-end  h-25 text-center mt-1 position-absolute w-100">

            <div class=" align-center ">
            <i v-if="key===0" class="fa fa-check-square fa-2x zoomed select" style=" color: #43a047 "></i>
            <i v-else class="fa fa-check-square fa-2x zoomed select" style="opacity: 0.5;  color: lightgray;" @click="setMainImg(key)"></i>
            </div>
            <div class=" align-center w-25 ">
            <i class="fa fa-times fa-2x zoomed" style="color: #b71c1c ;" @click="deleteImageItem(key)"></i>
            </div>

          </div>


        </div>

      </div>
      <hr>
    </div>

  </div>


</div>
</template>

<script>

import loading from "@/components/file-manager/subcomponents/file-manager-visual-loading"

export default {
name: "ImageEditor",

  props: {
    id: {
      type: String,
      require: true,
    },
  },

  components:{
    loading,
  },

  data() {
    return{
      metaDataInfoImg: [],

      item: [{xxx: 'xxx', yyy: 'yyyy'}],
    }
  },

  methods:{

    replaceByDefault(e) {
      e.target.src = 'https://www.pantus.ru/images_uploader/images/image_errorka.png'
    },

    /// не удалять
    // Сортировка, если выбрана новая обложка товара
   async setMainImg(index){
      let arr = this.selectedImages;
      let value = index;
      arr.sort(function(x,y){
        return x === arr[value] ? -1 : y === arr[value] ? 1 : 0;
      });
     this.$store.commit('NewFileManager/setDataSelectedFiles', {key: this.id, value: arr})
      this.metaDataInfoImg= [];

      this.metaDataInfoImg =  await this.$store.dispatch('NewFileManager/getPropertyImages',{url: this.selectedImages})

    },

   async deleteImageItem(key){
     this.$store.commit('NewFileManager/removeItemSelectedFiles', {key: this.id, index: key})

     this.selectedImages ? this.metaDataInfoImg =  await this.$store.dispatch('NewFileManager/getPropertyImages',{url: this.selectedImages})
         : this.metaDataInfoImg = []

    },

    async resetSelectedImages(){
      this.$store.commit('NewFileManager/resetSelectedFiles', {key: this.id,})

      this.metaDataInfoImg =  await this.$store.dispatch('NewFileManager/getPropertyImages',{url: this.selectedImages})

    },


  },

  computed: {
    ///Текущие изображения
    currentImages(){ return this.$store.getters["NewFileManager/getCurrentFiles"](this.id) },

    selectedImages() { return this.$store.getters["NewFileManager/getSelectedFiles"](this.id) },



  },


  async mounted() {
  ///запускаем получение свойств изображения

    this.metaDataInfoImg =  await this.$store.dispatch('NewFileManager/getPropertyImages',{url: this.selectedImages})


  },



}
</script>

<style scoped>

.property-image-block__text-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
}


.scrollblock {
  height: 260px;
  width: 100%;
  overflow-y: auto;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain
}

.imagecontain {

  height: 200px;
  text-align: left;

}

.zoomed:hover {
  zoom: 1.1;
  cursor: pointer;

}
.select:hover {
  opacity: 0.5;
  color: #43a047   !important;
}

</style>