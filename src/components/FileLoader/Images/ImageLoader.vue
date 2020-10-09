<template>



<div >
  <label class="file-select">

    <!-- We can't use a normal button element here, as it would become the target of the label. -->
    <div class="btn btn-success">
      <!-- Display the filename if a file has been selected. -->

      <span >Выбрать</span>
    </div>
    <!-- Now, the file input that we hide. -->
    <input type="file" name="xxx" multiple="multiple" @change="handleFileChange($event); onFileChange($event) " />
  </label>
  <hr>



  <div class="scrollblock">

    <div v-if="images.length<1" class="d-flex justify-content-center align-items-center h-100">
    <div class="boxes" >
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
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
export default {
name: "ImageLoader",

  props: {
    // Using value here allows us to be v-model compatible.
    value: FileList
  },
  data() {
    return {
      images: [],
      resizeInfo: [],
    }
  },

  methods: {
    handleFileChange(e) {
      // Whenever the file changes, emit the 'input' event with the file data.
      console.log(e.target.files)
     this.$emit('input', e.target.files)
     // this.$store.commit('ProductParts/setDataSelectedImages', this.images) /// СНАЧАЛА НА СЕРВЕР ЗАПИСАТЬ
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

    },




  },

  mounted() {

  }

}



</script>

<style scoped>




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


  height: 235px;
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


/*АНИМАЦИЯ КУБИИКИ-РУБИКИ ЛЯТЬ*/




.boxes {
  --size: 32px;
  --duration: 800ms;
  height: calc(var(--size) * 2);
  width: calc(var(--size) * 3);
  position: center;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  margin-top: calc(var(--size) * 1.5 * -1);
  -webkit-transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
}
.boxes .box {
  width: var(--size);
  height: var(--size);

  position: absolute;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.boxes .box:nth-child(1) {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  -webkit-animation: box1 var(--duration) linear infinite;
  animation: box1 var(--duration) linear infinite;
}
.boxes .box:nth-child(2) {
  -webkit-transform: translate(0, 100%);
  transform: translate(0, 100%);
  -webkit-animation: box2 var(--duration) linear infinite;
  animation: box2 var(--duration) linear infinite;
}
.boxes .box:nth-child(3) {
  -webkit-transform: translate(100%, 100%);
  transform: translate(100%, 100%);
  -webkit-animation: box3 var(--duration) linear infinite;
  animation: box3 var(--duration) linear infinite;
}
.boxes .box:nth-child(4) {
  -webkit-transform: translate(200%, 0);
  transform: translate(200%, 0);
  -webkit-animation: box4 var(--duration) linear infinite;
  animation: box4 var(--duration) linear infinite;
}
.boxes .box > div {
  --background: #5c8df6;
  --top: auto;
  --right: auto;
  --bottom: auto;
  --left: auto;
  --translateZ: calc(var(--size) / 2);
  --rotateY: 0deg;
  --rotateX: 0deg;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--background);
  top: var(--top);
  right: var(--right);
  bottom: var(--bottom);
  left: var(--left);
  -webkit-transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
  transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
}
.boxes .box > div:nth-child(1) {
  --top: 0;
  --left: 0;
}
.boxes .box > div:nth-child(2) {
  --background: #145af2;
  --right: 0;
  --rotateY: 90deg;
}
.boxes .box > div:nth-child(3) {
  --background: #447cf5;
  --rotateX: -90deg;
}
.boxes .box > div:nth-child(4) {
  --background: #dbe3f4;
  --top: 0;
  --left: 0;
  --translateZ: calc(var(--size) * 3 * -1);
}

@-webkit-keyframes box1 {
  0%,
  50% {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  100% {
    -webkit-transform: translate(200%, 0);
    transform: translate(200%, 0);
  }
}

@keyframes box1 {
  0%,
  50% {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  100% {
    -webkit-transform: translate(200%, 0);
    transform: translate(200%, 0);
  }
}
@-webkit-keyframes box2 {
  0% {
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
  }
  50% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  100% {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
}
@keyframes box2 {
  0% {
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
  }
  50% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  100% {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
}
@-webkit-keyframes box3 {
  0%,
  50% {
    -webkit-transform: translate(100%, 100%);
    transform: translate(100%, 100%);
  }
  100% {
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
  }
}
@keyframes box3 {
  0%,
  50% {
    -webkit-transform: translate(100%, 100%);
    transform: translate(100%, 100%);
  }
  100% {
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
  }
}
@-webkit-keyframes box4 {
  0% {
    -webkit-transform: translate(200%, 0);
    transform: translate(200%, 0);
  }
  50% {
    -webkit-transform: translate(200%, 100%);
    transform: translate(200%, 100%);
  }
  100% {
    -webkit-transform: translate(100%, 100%);
    transform: translate(100%, 100%);
  }
}
@keyframes box4 {
  0% {
    -webkit-transform: translate(200%, 0);
    transform: translate(200%, 0);
  }
  50% {
    -webkit-transform: translate(200%, 100%);
    transform: translate(200%, 100%);
  }
  100% {
    -webkit-transform: translate(100%, 100%);
    transform: translate(100%, 100%);
  }
}
html {
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}
*:before, *:after {
  box-sizing: border-box;
}





</style>