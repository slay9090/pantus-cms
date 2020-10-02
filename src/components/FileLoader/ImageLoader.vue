<template>



<div >
  <label class="file-select">

    <!-- We can't use a normal button element here, as it would become the target of the label. -->
    <div class="btn btn-success">
      <!-- Display the filename if a file has been selected. -->

      <span >Select File</span>
    </div>
    <!-- Now, the file input that we hide. -->
    <input type="file" multiple="multiple" @change="handleFileChange($event); onFileChange($event) " />
  </label>



  <div class="scrollblock">
  <div class="" v-for="(image, key) in images" :key="key">
    <div class="d-flex">
    <div class="imagecontain col-6 ">
      <img class="preview" :ref="'image'" />
<!--      {{ image.name }}-->
    </div>
      <div class="col-3 border border-dark">
        <div class="row border border-dark">  ffffffffffffffffffff    </div>


      </div>


  </div>
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
    }
  },

  methods: {
    handleFileChange(e) {
      // Whenever the file changes, emit the 'input' event with the file data.

      this.$emit('input', e.target.files)

    },



    onFileChange(e) {

      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log(selectedFiles[i]);
        this.images.push(selectedFiles[i]);
      }
      for (let i = 0; i < this.images.length; i++) {
        let reader = new FileReader();
        reader.onload = () => {
          this.$refs.image[i].src = reader.result;
        };
        reader.readAsDataURL(this.images[i]);
      }
    },




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
  border: 1px solid #333333;
  height: 200px;

  text-align: left;

}

.scrollblock {


  height: 500px;
  width: 100%;
  overflow-y: auto;

}

/*.image-preview {*/
/*  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;*/
/*  padding: 20px;*/
/*}*/
/*img.preview {*/
/*  width: 200px;*/
/*  background-color: white;*/
/*  border: 1px solid #DDD;*/
/*  padding: 5px;*/
/*}*/

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