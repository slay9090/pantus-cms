<template>
  <b-modal
      class="modal-images-manager"
      :id="modalId"
      title="Файл менеджер"
      size="lg"
      centered no-fade no-close-on-backdrop no-close-on-esc
      ok-title="Сохранить"
  >


    <div class="border d-flex h-100" >

      <div class="  h-100 " >
        <div class="my-3 text-center ">
          <div style="height: 60px">
            <i :style="{ opacity: currentComponent==='images-edit' ? 1 : 0.6 }" class="fa fa-file-image-o fa-3x mb-3 ico" aria-hidden="true" @click="currentComponent='images-edit'" ></i>
          </div>
          <div class="" style="height: 60px; width: 60px" >
            <i :style="{ opacity: currentComponent==='images-upload' ? 1 : 0.6 }" class="fa fa-cloud-upload fa-3x ico" aria-hidden="true" @click="currentComponent='images-upload'" ></i>
          </div>

          <div>
            <i :style="{ opacity: currentComponent==='images-load' ? 1 : 0.6 }" class="fa fa-search fa-3x ico" aria-hidden="true" @click="currentComponent='images-load'" ></i>
          </div>


        </div>
      </div>
      <div class="w-100 border h-100 px-3">

        <component :is="currentComponent" :id="id"></component>

      </div>
    </div>




    <template v-slot:modal-footer>
      <div class="w-100 d-flex align-items-center justify-content-between">
        <div class="">
          <b-alert
              class="my-0 py-0"
              :show="dismissCountDown"
              :variant=messageNotifications.type
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"

          >
            {{ messageNotifications.text }}
          </b-alert>
        </div>
        <div class=" ">
          <b-button
              variant="primary"
              class="float-right "
              @click="handleOk"
              :disabled = !buttonSaveIsActive
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

      </div>
    </template>

  </b-modal>
</template>

<script>
import imagesEdit from '@/components/images-manager/editor';
import imagesUpload from '@/components/images-manager/uploader';
import imagesLoad from '@/components/images-manager/loader';


export default {
name: "modal",
//
  components:{
    'images-edit': imagesEdit,
    'images-upload': imagesUpload,
    'images-load': imagesLoad,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    modalId: {
      type: String,
      required: true,
    },

  },

  data() {
    return {
      files: null,
      currentComponent: 'images-edit',
      dismissSecs: 5,
      dismissCountDown: 0,
      messageNotifications: {},
      previousCountLenghtImg: 0,

    }
  },

  methods: {
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()

      console.log('OK')

      this.$store.commit('NewFileManager/setDataCurrentFiles', {key: this.id, value:
      this.$store.getters["NewFileManager/getSelectedFiles"](this.id).slice()
      })

      this.$nextTick(() => {
        this.$bvModal.hide(this.modalId)
      })
    },

    handleCancel(bvModalEvt){
      bvModalEvt.preventDefault()
      this.$store.commit('NewFileManager/setDataSelectedFiles', {key: this.id, value:
            this.$store.getters["NewFileManager/getCurrentFiles"](this.id).slice()
      })
      this.$nextTick(() => {
        this.$bvModal.hide(this.modalId)
      })

    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

  },

  computed: {
    selectedImg(){
      return this.$store.getters["NewFileManager/getSelectedFiles"](this.id);
    },

    buttonSaveIsActive(){
      return this.currentComponent === 'images-edit'
    },

    alertText() {
      return this.$store.getters["NewFileManager/textNotifications"]
    }

  },

  mounted() {

  },

  watch:{
    /// авто оповещения в футере при изменении кол-ва элелментов во вьюксе
    selectedImg(){
      this.$store.commit('NewFileManager/setTextNotifications', {type: 'success',
        text: `Объектов: ${this.selectedImg.length} item(s)`})

    },

    ///Следим за изменением, и вызываем алерт если вьюкс изменился
    alertText(){
      this.dismissCountDown = this.dismissSecs // запустить оповещение
      this.messageNotifications = this.$store.getters["NewFileManager/textNotifications"];
    },


  },


}
</script>

<style scoped>
.ico {
  cursor: pointer;
  color: #007bff;
  opacity: 0.6;
}

.ico:hover{
  zoom: 1.1;
  text-shadow: 1px 1px 1px #adb5bd;

}

</style>