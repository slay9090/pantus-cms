<template>
  <div >
    <b-modal

        id="modal-file-uploader"
        title="Загрузка файлов"
        size="lg"
        centered no-fade no-close-on-backdrop no-close-on-esc
        ok-title="Сохранить"
    >


      <div class="border d-flex h-100" >

        <div class=" border h-100 " >
          <div class="my-3 text-center ">
            <div style="height: 60px">
          <i :style="{ opacity: currentComponent==='imagefileview' ? 1 : 0.6 }" class="fa fa-file-image-o fa-3x mb-3 ico" aria-hidden="true" @click="currentComponent='imagefileview'" ></i>
            </div>
            <div class="" style="height: 60px; width: 60px" >
          <i :style="{ opacity: currentComponent==='imagefileselect' ? 1 : 0.6 }" class="fa fa-cloud-upload fa-3x ico" aria-hidden="true" @click="currentComponent='imagefileselect'" ></i>
            </div>

            <div>
              <i :style="{ opacity: currentComponent==='imagefileserver' ? 1 : 0.6 }" class="fa fa-search fa-3x ico" aria-hidden="true" @click="currentComponent='imagefileserver'" ></i>
            </div>


            </div>
        </div>
        <div class="w-100 border h-100 px-3">

          <component v-model="files" :is="currentComponent"></component>

        </div>
      </div>




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
import imagefileview from '@/components/file-manager/images/ImageEditor'
import imagefileselect from '@/components/file-manager/images/ImageUploader';
import imagefileserver from '@/components/file-manager/images/ImageLoader'
import Axios from "axios";


export default {
name: "UpLoader",

  components:{
    'imagefileselect':imagefileselect,
    'imagefileview':imagefileview,
    'imagefileserver': imagefileserver,
  },
  data() {
    return {
      files: null,
      currentComponent: 'imagefileview',

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

<style >



#modal-file-uploader___BV_modal_body_ {
  height: 400px !important;
}


.ico {
  cursor: pointer;
  color: #007bff;
  opacity: 0.6;

}

.ico:hover{
  zoom: 1.1;

}

</style>