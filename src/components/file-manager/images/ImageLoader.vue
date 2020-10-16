<template>
  <div  class="h-100 w-100 d-flex flex-column " >

    <div>
      <b-button class="mt-3" variant="info">sdfsdfsdf</b-button>
      <hr>
    </div>

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
                    <div class="align-items-center text-center w-50 pt-1 block-on-button-select">
                      <i class="fa fa-check-circle-o ico-on-button" aria-hidden="true"></i>
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
          @input="goPageItems($event)"
          first-number
          size="sm"
          class="mb-0"

      ></b-pagination>
    </div>
    <imagepopup v-if="currentImgItem" :image=currentImgItem />
  </div>

</template>




<script>
import imagepopup from "@/components/ImagePopup"
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

  },

  methods: {
      goPageItems(evt){
        let urlArr = []
        this.imgAllItems.forEach((url,index) => {

          if (index > (evt*this.itemsCountOfPage)-this.itemsCountOfPage && index <= evt*this.itemsCountOfPage){
            if (this.imgAllItems[index]) {
             // console.log(index, evt, url)
              urlArr.push(this.imgAllItems[index]);
            }
          }
        })

        this.imgOfPageItems = urlArr;

      },

   openImagePopup(img){
      this.currentImgItem = img
    },

  },


 async mounted() {
   await this.$store.dispatch('FileManager/getDataAllImageOnServer')
   this.imgAllItems = this.$store.getters["FileManager/imagesAllOnServer"]
   this.imgOfPageItems = this.imgAllItems.slice(0, this.itemsCountOfPage) // обрезать до itemsCountOfPage



   //this.$bvModal.show('modal-multi-2')

  // this.$refs['my-modal'].toggle()

  // this.$root.$emit('bv::show::modal', 'modal-multi-2', '#btnShow')
  }


}
</script>

<style scoped>
/**{*/
/*  border: 1px double  black;*/
/*}*/

.scrollblock {
  height: 240px;
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

  /*display: flex;*/
  /*display: flex;         !* NEW, Spec - Firefox, Chrome, Opera *!*/

  /*justify-content: flex-start;*/
  align-items: center;

  box-shadow: 0.1em 0.1em 5px rgba(122,122,122,0.5); /* Параметры тени */

}

.image-space-block {
  background-color: white !important;

  width: 95%;

  /*border-radius: 10px 5% / 20px 25em 30px 35em;*/
  /*border-bottom-right-radius: 5px;*/
  /*border-bottom-left-radius:  5px;*/
  /*box-shadow: 0.1em 0.1em 5px rgba(122,122,122,0.5); !* Параметры тени *!*/
}

.image-space-block-button {
  background-color: white !important;
  width: 95%;

  /*border-radius: 10px 5% / 20px 25em 30px 35em;*/
  /*border-top-left-radius:     5px;*/
  /*border-top-right-radius:    5px;*/

  /*box-shadow: 0.1em 0.1em 5px rgba(122,122,122,0.5); !* Параметры тени *!*/
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

.block-on-button-zoom {
  /*border: #e4e4e6 solid 1px;*/
  cursor: pointer;
  /*box-shadow: 0 0 2px;*/
  /*border-top-left-radius:     5px;*/
  /*border-top-right-radius:    5px;*/

  border-right: 1px solid #adb5bd;
  border-bottom: 1px solid #adb5bd;

}
.block-on-button-select {
  /*border: #e4e4e6 solid 1px;*/
  cursor: pointer;
  /*box-shadow: 0 0 2px;*/
  /*border-top-left-radius:     5px;*/
  /*border-top-right-radius:    5px;*/
  /*border-right: 1px solid #adb5bd;*/
  border-bottom: 1px solid #adb5bd;

}
.block-on-button-zoom, .block-on-button-select{

  /*transition: margin 1s, color 0.5s;*/



}
.block-on-button-zoom:hover {

  /*border-top-left-radius:     5px;*/
  /*border-top-right-radius:    5px;*/
  box-shadow: 0.1em 0.1em 5px rgba(122,122,122,0.5); /* Параметры тени */
  z-index: 2;

  /*background-color: #212529;*/
}

.block-on-button-select:hover {
  box-shadow: -0.2em 0.1em 5px rgba(122,122,122,0.5) ; /* Параметры тени */
  z-index: 2;
}



</style>