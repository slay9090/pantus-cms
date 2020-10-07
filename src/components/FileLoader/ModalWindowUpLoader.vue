<template>
  <div >
    <b-modal

        id="modal-file-uploader"
        title="Загрузка файлов"
        size="lg"
        centered no-fade no-close-on-backdrop no-close-on-esc
        ok-title="Сохранить">


      <p><imagefileselect v-model="files" ></imagefileselect></p>

      <template v-slot:modal-footer>
        <div class="w-100">

          <b-button
              variant="primary"
              class="float-right "
              @click="handleOk"
          >
            Сохранить
          </b-button>
          <b-button
              variant=""
              class="float-right mx-3"
              @click="handleCancel"
          >
            Отмена
          </b-button>

        </div>
      </template>

    </b-modal>


  </div>
</template>

<script>

import imagefileselect from '@/components/FileLoader/ImageLoader';
import Axios from "axios";


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


    async sendImgToServer(){

      let rawData = {
        name: 'this.name',
      }
      rawData = JSON.stringify(rawData)
      let formData = new FormData()
      for (let i = 0; i < this.files.length; i++) {

        formData.append('images'+i, this.files[i], this.files[i].name)
      }
      formData.append('data', rawData)
      try {
        let response = await Axios.post('https://www.pantus.ru/images_uploader/script.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        this.$store.commit('ProductParts/setDataSelectedImages', Object.values(response.data))
        //console.log(this.$store.getters["ProductParts/selectedImages"])

        }
        catch {console.log('FAILED SEND POST REQ')}
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()

      console.log('OK')

      this.sendImgToServer();



      this.$nextTick(() => {
        this.$bvModal.hide('modal-file-uploader')
      })
    },

    handleCancel(bvModalEvt){
      bvModalEvt.preventDefault()

      this.$nextTick(() => {
        this.$bvModal.hide('modal-file-uploader')
      })

    },

  },

  computed: {

  },

}
</script>

<style scoped>

</style>