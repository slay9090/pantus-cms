<template>
<div>
  Текщие изображения
  <hr>

  <div class="scrollblock">




    <div class="" v-for="(image, key ) in currentImages" :key="key">

      <div class="d-flex" >
        <div class="imagecontain col-7 ">
          <img class="preview" :src="image" />

        </div>
        <div class="col-4 ">
          <div class="row  text-break border-bottom">  {{getNameImg(image)}}    </div>
          <div class="row border-bottom"> {{  }}  sdfsdf  </div>
          <div class="row border-bottom">  123123 кб. </div>

          <div class="row  align-center justify-content-end  h-25 text-center mt-1 position-absolute w-100">

            <div class=" align-center ">
            <i v-if="key===0" class="fa fa-check-square fa-2x zoomed select" style=" color: #2ecc71 "></i>
            <i v-else class="fa fa-check-square fa-2x zoomed select" style="opacity: 0.5;  color: lightgray;" @click="setMainImg(key)"></i>
            </div>
            <div class=" align-center w-25 ">
            <i class="fa fa-times fa-2x zoomed" style="color: red;"></i>
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

export default {
name: "ImageEditor",

  data() {
    return{

    }
  },

  methods:{
    getNameImg(url){
    return   url.replace('https://www.pantus.ru/images_uploader/images/', '')
    },

    xxx(url) {
   var imgMetaInfo = {};
     function getMeta(url)
      {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = () => {

            // var request = require("request");
            // request({
            //   url: url,
            //   method: "HEAD"
            // }, function(err, response, ) {
            //   console.log(response.headers);
            //   process.exit(0);
            //   imgMetaInfo["content"] = response.headers;
            // });


            resolve(img)

          };
          img.onerror = () => reject();
          img.src = url;
        });
      }
      async function run() {
        let img = await getMeta(url);
       let response = await Axios.post(url);
       console.log(response.headers);
        console.log(url);
        imgMetaInfo["resize"] = (img.width+'x'+img.height);
        imgMetaInfo["name"] = img;


        //imgMetaInfo["siz"] = img.size;


      }
      run();

    console.log("imgMetaInfo", imgMetaInfo)
    return imgMetaInfo.resize;

    },

    setMainImg(index){
      var arr = this.$store.getters["ProductParts/selectedImages"];
      var value = index;
      arr.sort(function(x,y){
        return x === arr[value] ? -1 : y === arr[value] ? 1 : 0;
      });
     this.$store.commit('ProductParts/setDataSelectedImages', arr)

    },



  },

  computed: {

  currentImages(){
    return this.$store.getters["ProductParts/selectedImages"]
  },

  },
}
</script>

<style scoped>
.scrollblock {
  height: 300px;
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
  color: #2ecc71  !important;
}

</style>