<template>
<div>
  <div class="align-center d-flex justify-content-between align-items-center">

    <div class="text-center align-center h-100 mt-3 mb-0">Текущие изображения: {{currentImages.length}} шт. {{loadingFile}}</div>

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

    <div v-if="loadingFile && currentImages.length>0"  class="h-100"> <loading ></loading> </div>
    <div v-else class="" v-for="(image, key ) in currentImages" :key="key">

      <div class="d-flex" >
        <div class="imagecontain col-7 ">
          <img class="preview" :src="image"  @error="replaceByDefault" />

        </div>
        <div class="col-4 property-image-block">

          <div v-if="getNameImg(image)" class="row  text-break border-bottom property-image-block__text-limit" :title="image">  {{getNameImg(image)}}    </div>
          <div v-if="metaDataInfoImg[key]" class="row border-bottom"> {{ metaDataInfoImg[key][1]  }}</div>
          <div v-if="metaDataInfoImg[key]" class="row border-bottom"> {{ (metaDataInfoImg[key][0]/1024).toFixed(2) + " kb" }} </div>

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
import Axios from "axios";
import loading from "@/components/file-manager/private/VisualLoading"

export default {
name: "ImageEditor",

  components:{
    loading,
  },

  data() {
    return{
      metaDataInfoImg: [],
      loadingFile: true,
    }
  },

  methods:{

    replaceByDefault(e) {
      e.target.src = 'https://www.pantus.ru/images_uploader/images/image_errorka.png'
    },

    /// Получаем имя файла
    getNameImg(url){
    return   url.replace('https://www.pantus.ru/images_uploader/images/', '')
    },

    ///  Получить и вернуть разрешение изображения
    async getMetaInfo(url){
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img.naturalWidth+'x'+img.naturalHeight)
        img.onerror = reject
        img.src = url
      })
    },
    /// получить размер контента гет запросом = размер файла
    async getFileSize(url) {
      let err = null;
      let response = await Axios.get(url).catch(function (error){
        err= error
      });
      /// заодно обрабатываем исключения, что бы всеравно вывести изображения
      if (err !== null){
        this.$store.commit('FileManager/setTextNotifications', {type: 'danger', text: err})
        this.loadingFile = false
      }
      return response.headers['content-length']

    },
    /// Запускаем в хуке, кидаем урлы из хранилища -> через вычисляемое свойство , ждем выполнения очереди промисов
   getPropertyImg(curentUrl){
      curentUrl.forEach(async (url, idx, array) => {
        this.metaDataInfoImg.splice(idx, 0, ([0, 'unknown'])); // предварительно заполняем массив свойст изобр. что бы индексы соответсвовали в случае исключ.
        Promise.all([await this.getFileSize(url), await this.getMetaInfo(url),])
           .then(values => {
          this.metaDataInfoImg.splice(idx, 1, (values)); // записываем в дату строго по индексу, что бы свойства файлов соотствовали самим фйлам, иначе рандом.
             /// Ждем окончания загрузки, отключаем фон
          if (this.metaDataInfoImg.length === array.length) {
            this.loadingFile = false;
          }
        }
        )


      });

    },

    /// Сортировка, если выбрана новая обложка товара
    setMainImg(index){
      var arr = this.$store.getters["ProductParts/selectedImages"];
      var value = index;
      arr.sort(function(x,y){
        return x === arr[value] ? -1 : y === arr[value] ? 1 : 0;
      });
     this.$store.commit('ProductParts/setDataSelectedImages', arr)
      this.metaDataInfoImg= [];
      this.loadingFile = true;
      this.getPropertyImg(this.$store.getters["ProductParts/selectedImages"]);

    },

    deleteImageItem(key){
      this.$store.commit('ProductParts/delItemSelectedImages', key)
    },

    resetSelectedImages(){
      this.$store.commit('ProductParts/resetSelectedImages')
      this.loadingFile = false
    },


  },

  computed: {
    ///Текущие изображения товара
    currentImages(){
      return this.$store.getters["ProductParts/selectedImages"]
    },
  },


  async created() {
  ///запускаем получение свойств изображения
      await this.getPropertyImg(this.currentImages)
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