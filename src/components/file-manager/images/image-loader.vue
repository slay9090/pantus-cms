<template>
  <div  class="h-100 w-100 d-flex flex-column " >

<!--    <div class="d-flex ">-->
<!--     -->
<!--      <div></div>-->
<!--    -->
<!--    </div>-->

    <b-container class="block-header-load-buttons">
      <b-row  align-v="center" class=" py-2">
        <b-col class="  d-flex justify-content-start text-left" cols="10" > Выбрано: {{selectedImagesLenght}} шт. </b-col>
        <b-col class=" d-flex justify-content-end  text-right my-2"  cols="2" >
          <i class="block-header-load-buttons__icon fa fa-ban fa-2x text-danger mr-3" aria-hidden="true" @click="clearSelectedImages"></i>
          <i class="block-header-load-buttons__icon fa fa-plus-circle fa-2x text-success" aria-hidden="true" @click="applySelectedImagesToCurrentImages"></i>
        </b-col>

      </b-row>
      <hr class="mt-1 mb-2">
    </b-container>


    <div class="scrollblock bg-color">

          <b-container class="h-100 ">
            <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="4" class="justify-content-md-center h-100 " align-v="center" align-h="center">
              <b-col class="align-center " v-for="(item, key) in imgOfPageItems" :key="key">
                <div class="bg "></div>
<!--                Контейнер -->
                <div class="image-box d-flex flex-column">
<!--                  кнопки-->
                <div class="image-space-block-button d-flex justify-content-between ">
                    <div class=" align-items-center text-center w-50 pt-1 block-on-button-zoom" v-b-modal.modal-multi-2 @click="openImagePopup(item);">
                      <i class="fa fa-search-plus ico-on-button" aria-hidden="true"></i>
                    </div>
                    <div class="align-items-center text-center w-50 pt-1 block-on-button-select" @click="addItemInSelectedImages(item)">

                      <i v-if="isSelect(item.url)" class="fa fa-check-circle-o ico-on-button-selected" aria-hidden="true"></i>
                      <i v-else class="fa fa-check-circle-o ico-on-button" aria-hidden="true"></i>
                    </div>



                </div>
<!--                  изображение-->
                <div class="d-flex justify-content-center align-items-center image-space-block" style="height: 80px">
                  <b-img thumbnail fluid :src=item.url :alt="'image'+key" style="max-height: 70px; max-width: 95%"></b-img>
                </div>
                </div>
                <div class="bg"></div>
              </b-col>
            </b-row>
          </b-container>

    </div>

    <div class="h-10 d-flex align-items-end justify-content-center">
      <b-pagination
          align="center"
          v-model="currentPage"
          :total-rows=pageLenght
          :per-page="perPage"
          @change="goPageItems($event)"
          first-number
          size="sm"
          class="mb-0"

      ></b-pagination>
    </div>
    <imagepopup v-if="currentImgItem" :image=currentImgItem />
  </div>

</template>




<script>
import imagepopup from "@/components/image-detail-popup"
export default {
  name: "ImageLoader",

  components: {
    imagepopup,
  },

  data() {
    return {
      imgAllItems: null,
      imgOfPageItems: null,
      itemsCountOfPage: 8,
      perPage: 1,
      currentPage: 1,
      urlImgPopup: null,
      currentImgItem: null,
      selectImgCount: 0,
    }
  },

  computed: {
    pageLenght(){
     // console.log(this.imgAllItems)
      if (this.imgAllItems!==null) {
        return (this.imgAllItems.length / this.itemsCountOfPage)+1
      }
      else {  return 0;  }
    },

    selectedImages(){
      return this.$store.getters["FileManager/selectedImageFromFIleManager"]
    },

    selectedImagesLenght(){
      return this.selectedImages.length;
    }


  },

  methods: {
      /// Пагинация
      goPageItems(evt){
        let urlArr = []
        this.imgAllItems.forEach((url,index) => {
          if (index >= (evt*this.itemsCountOfPage)-this.itemsCountOfPage && index < (evt*this.itemsCountOfPage)){
           // console.log('ИНДЕКС ' +index, 'ПАГИНАЦИЯ НАЧАЛО ' +((evt*this.itemsCountOfPage)-this.itemsCountOfPage), 'ПАГИНАЦИЯ КОНЕЦ ' +(evt*this.itemsCountOfPage), 'ВСЕГО '+this.$store.getters["FileManager/imagesAllOnServer"].length)
            if (this.imgAllItems[index]) {
              urlArr.push(this.imgAllItems[index]);
            }
          }
        })

        this.imgOfPageItems = urlArr;

      },

   openImagePopup(img){
      this.currentImgItem = img
    },

    addItemInSelectedImages(img){
        if (this.isSelect(img.url)) {
          console.log(this.selectedImages.indexOf(img.url))
          this.$store.commit('FileManager/delItemSelectedImageFromFIleManager', this.selectedImages.indexOf(img.url))
        }
        else {
          this.$store.commit('FileManager/addItemSelectedImageFromFIleManager', img.url)
        }
    },

    ///  чекаем
    isSelect(currentUrl){
      let result = false;
      for (var url in this.selectedImages) {
        //console.log(this.selectedImages[url], currentUrl);
        if (currentUrl === this.selectedImages[url]) {
          result = true
          break;
        }
      }
      return result;
    },

    clearSelectedImages(){
        this.$store.commit('FileManager/clearItemsSelectedImageFromFIleManager')
    },

    applySelectedImagesToCurrentImages(){
      let currentProductImg =   this.$store.getters["ProductParts/selectedImages"];
      let concatCurrentImg = currentProductImg.concat(this.selectedImages);
      this.$store.commit('ProductParts/setDataSelectedImages', concatCurrentImg);
      this.$store.commit('FileManager/clearItemsSelectedImageFromFIleManager');
    },


  },


 async mounted() {
   await this.$store.dispatch('FileManager/getDataAllImageOnServer')
   this.imgAllItems = this.$store.getters["FileManager/imagesAllOnServer"]
   this.imgOfPageItems = this.imgAllItems.slice(0, this.itemsCountOfPage) // обрезать до itemsCountOfPage


  }


}
</script>

<style scoped>

.scrollblock {
  height: 250px;
  width: 100%;
  overflow-y: hidden;
}
.h-10 {
  height: 10%;
}

.bg {
  height: 3px;
}

.bg-color {
  background-color: #EEEEEE !important;
}

.image-box {
  border-radius: 5px;
  background-color: white !important;
  align-items: center;
  box-shadow: 0.1em 0.1em 5px rgba(122,122,122,0.5);

}

.image-space-block {
  background-color: white !important;
  width: 95%;
}

.image-space-block-button {
  background-color: white !important;
  width: 95%;
}

.ico-on-button {
  font-size: 1.3em;
  color: #007BFF;
  opacity: 0.7;
  border-radius: 50%;
  -webkit-transition: -webkit-transform .8s ease-in-out;
  transition:         transform .8s ease-in-out;
}

.ico-on-button:hover {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
  opacity: 1;
}

.ico-on-button-selected {
  font-size: 1.3em;
  color: #28a745;
  border-radius: 50%;
  -webkit-transition: -webkit-transform .8s ease-in-out;
  transition:         transform .8s ease-in-out;
}

.ico-on-button-selected:hover {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}

.block-on-button-zoom {
  cursor: pointer;
  border-right: 1px solid #adb5bd;
  border-bottom: 1px solid #adb5bd;
}
.block-on-button-select {
  cursor: pointer;
  border-bottom: 1px solid #adb5bd;
}
.block-on-button-zoom, .block-on-button-select{
}
.block-on-button-zoom:hover {
  box-shadow: 0.1em 0.1em 5px rgba(122,122,122,0.5); /* Параметры тени */
  z-index: 2;
}

.block-on-button-select:hover {
  box-shadow: -0.2em 0.1em 5px rgba(122,122,122,0.5) ; /* Параметры тени */
  z-index: 2;
}

.block-header-load-buttons__icon {
  cursor: pointer;
  opacity: 0.8;

}
.block-header-load-buttons__icon:hover{
  opacity: 1;
  text-shadow: 1px 1px 1px #adb5bd;
}

</style>