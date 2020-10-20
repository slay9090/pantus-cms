<template>



<div >

  <div class="d-flex justify-content-between align-items-center mt-3">
  <label class="file-select mb-0">

    <!-- We can't use a normal button element here, as it would become the target of the label. -->


    <div class="btn btn-success">
      <span >Выбрать</span>
    </div>
    <!-- Now, the file input that we hide. -->
    <input type="file" name="xxx" multiple="multiple" @change="handleFileChange($event); onFileChange($event) " />
  </label>

    <div class="upload-block text-center ">
      <i class="fa fa-upload fa-2x upload-block__ico text-primary " aria-hidden="true" @click="sendImgToServer"></i>
    </div>

  </div>
  <hr>


  <div class="scrollblock">



   <div v-if="loading" class="h-100"><loading  ></loading></div>
    <div v-if="images.length<1" class="bg-upload-block  h-100 d-flex flex-column align-items-center justify-content-center" >
      <i class="fa fa-cloud-upload bg-upload-block__ico " aria-hidden="true"></i>
      <span class="bg-upload-block__text">Upload file</span>
    </div>


  <div class="" v-for="(image, key ) in images" :key="key">

    <div class="d-flex" >
    <div class="imagecontain col-7 ">
      <img class="preview" :ref="'image'" />

    </div>
      <div class="col-4 ">
        <div class="row  text-break border-bottom">  {{image.name}}    </div>
         <div class="row border-bottom">  {{resizeInfo[key]}}    </div>
          <div class="row border-bottom">  {{ (image.size/1024).toFixed(2)}} кб. </div>
      </div>

  </div>
    <hr>
    </div>

  </div>


</div>
</template>

<script>
import loading from "@/components/file-manager/private/VisualLoading"
import Axios from "axios";
export default {
name: "ImageLoader",
  components:{
    loading,
  },

  props: {
    // Using value here allows us to be v-model compatible.
    value: FileList
  },
  data() {
    return {
      images: [],
      resizeInfo: [],
      loading: false,
      files: null,

    }
  },

  methods: {
    handleFileChange(e) {
      // Whenever the file changes, emit the 'input' event with the file data.
      this.loading=true
     // console.log(e.target.files)
     //this.$emit('input', e.target.files)
      this.files = e.target.files;
     //this.$store.commit('ProductParts/setDataSelectedImages', this.images) /// СНАЧАЛА НА СЕРВЕР ЗАПИСАТЬ
    },


    /**
     * Записываем выбранные картинки в массив и рендерим их
     * @param e
     */
    onFileChange(e) {
      this.images = []
      this.resizeInfo = []
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.images.push(selectedFiles[i]);
      }
      console.log('this.images', this.images)
      for (let i = 0; i < this.images.length; i++) {
        let reader = new FileReader();
        reader.onload = () => {
          this.$refs.image[i].src = reader.result;
          async function getResizeImage() {
            // return new Promise((resolve, reject) => {
              var image = new Image();
               image.src = await reader.result;
              if (image.width!==0) {
                return  image;
              } else {
                console.log(image.width)
                return "promise failed";
              }
          }

          getResizeImage()
              .then(res => {
                let test = res;
                this.resizeInfo.splice(i, 0, (test.width+'x'+test.height));
              })
              .catch(err => {
                console.log(err);
              });
        };
        reader.readAsDataURL(this.images[i]);
      }
        this.loading=false
    },
    /// Отправляем изобраэения на сервер
    async sendImgToServer(){

      if (this.files) {

        let rawData = {
          name: 'this.name',
        }
        rawData = JSON.stringify(rawData)
        let formData = new FormData()
        for (let i = 0; i < this.files.length; i++) {

          formData.append('images' + i, this.files[i], this.files[i].name)
        }
        formData.append('data', rawData)
        try {
          let response = await Axios.post('https://www.pantus.ru/images_uploader/script.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.applySelectedImagesToCurrentImages(response.data);

        } catch {
          console.log('FAILED SEND POST REQ')
        }
      this.images = [];  this.files = null; // autoreset



      }
      else {
        this.$store.commit('FileManager/setTextNotifications', {type: 'danger', text: 'Нет выбранных файлов!'})
      }
    },

    applySelectedImagesToCurrentImages(responseUrl){
      let currentProductImg =   this.$store.getters["ProductParts/selectedImages"];
      let concatCurrentImg = currentProductImg.concat(Object.values(responseUrl));
      this.$store.commit('ProductParts/setDataSelectedImages', concatCurrentImg);
      //this.$store.commit('FileManager/clearItemsSelectedImageFromFIleManager');
    },


  },

  mounted() {

  }

}



</script>

<style scoped>

.upload-block__ico{
opacity: 0.6;
  cursor: pointer;
}

.upload-block__ico:hover{
  opacity: 1;
  text-shadow: 1px 1px 1px #adb5bd;
}

.bg-upload-block__ico {
  font-size: 7rem;
  opacity: 0.3;
}

.bg-upload-block__text {
  opacity: 0.3;
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

.scrollblock {
  height: 260px;
  width: 100%;
  overflow-y: auto;

}
.file-select > .select-button {
  padding: 1rem;
  color: white;
  background-color: #2EA169;
  border-radius: .3rem;
  text-align: center;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}

</style>