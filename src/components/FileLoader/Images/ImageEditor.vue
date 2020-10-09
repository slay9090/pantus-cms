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
          <div class="row border-bottom"> {{ xxx(image) }}    </div>
          <div class="row border-bottom">  123123 кб. </div>
        </div>

      </div>
      <hr>
    </div>

  </div>


</div>
</template>

<script>
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

    //var curl=url
   var imgMetaInfo = {};
     function getMeta(url)
      {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject();
          img.src = url;
        });
      }


      async function run() {
        let img = await getMeta(url);
        imgMetaInfo["resize"] = (img.width+'x'+img.height);
       // imgMetaInfo["name"] = img.size;


      }
      run();
    console.log("imgMetaInfo", imgMetaInfo)
    return imgMetaInfo.resize;

    }

    // xxx(url){
    //
    //   async function getMeta(url) {
    //     var img = new Image();
    //     img.onload = function(){
    //       //alert( this.width+' '+ this.height );
    //       if (img.width!==0) {
    //         return  img;
    //       } else {
    //         console.log(img.width)
    //         return "promise failed";
    //       }
    //
    //     };
    //     img.src = await url;
    //   }
    //
    //   getMeta(url)
    //       .then(res => {
    //         let metaImg = res;
    //        // this.resizeInfo.splice(i, 0, (test.width+'x'+test.height));
    //         console.log(metaImg.width)
    //
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    // }
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

</style>