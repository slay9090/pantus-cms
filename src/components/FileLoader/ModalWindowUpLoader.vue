<template>
  <div >
    <b-modal

        id="modal-file-uploader"
        title="Загрузка файлов"
        size="lg"
        centered no-fade no-close-on-backdrop no-close-on-esc
        ok-title="Сохранить">


      <p><imagefileselect v-model="files" ></imagefileselect></p>
<!--      <div v-for="(fileitem, index) in files" :key="index">{{ getBase64(fileitem) }}-->
<!--        <div class="image-preview" v-if="fileitem" >-->
<!--          <img class="preview" :src="imageData" >-->
<!--        </div>-->
<!--      </div>-->




    </b-modal>


  </div>
</template>

<script>

import imagefileselect from '@/components/FileLoader/ImageLoader';


export default {
name: "UpLoader",

  components:{
    imagefileselect,
  },
  data() {
    return {
      files: null,

    }
  },

  methods: {

  },

  computed: {

  },

}
</script>

<style scoped>

</style>