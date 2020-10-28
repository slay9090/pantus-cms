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

          <component :is="currentComponent"></component>

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


  </div>
</template>

<script>
import imagefileview from '@/components/file-manager/images/image-editor';
import imagefileselect from '@/components/file-manager/images/image-uploader';
import imagefileserver from '@/components/file-manager/images/image-loader';



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

      this.$nextTick(() => {
        this.$bvModal.hide('modal-file-uploader')
      })
    },

    handleCancel(bvModalEvt){
      bvModalEvt.preventDefault()

     this.resetSelectedImages();

      this.$nextTick(() => {
        this.$bvModal.hide('modal-file-uploader')
      })

    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    /// Сбросить все выбранные изобр. РЕВЬЮ нид - вынести всё в один файл
    resetSelectedImages(){
      //this.$store.commit('ProductParts/setDataSelectedImages', this.$store.getters["ProductParts/currentImages"])
      this.$store.commit('ProductParts/resetSelectedImages');

    }

  },

  computed: {
      changeSelectedImg(){
        return this.$store.getters["ProductParts/selectedImages"];
      },
      /// получаем изменения текста оповещения
      alertText(){
        return this.$store.getters["FileManager/textNotifications"];
      },

      buttonSaveIsActive(){
        return this.currentComponent === 'imagefileview'
      },

  },
  watch:{
    /// авто оповещения в футере при изменении кол-ва элелментов во вьюксе
    changeSelectedImg(){
      if (this.previousCountLenghtImg !==  this.changeSelectedImg.length) {
        if (this.previousCountLenghtImg <  this.changeSelectedImg.length) {
          this.$store.commit('FileManager/setTextNotifications', {type: 'success',
            text: `Add: ${this.changeSelectedImg.length - this.previousCountLenghtImg} item(s)`})
          this.previousCountLenghtImg = this.changeSelectedImg.length
        }
        if (this.previousCountLenghtImg >  this.changeSelectedImg.length){
            this.$store.commit('FileManager/setTextNotifications', {type: 'success',
              text: `Remove: ${this.changeSelectedImg.length - this.previousCountLenghtImg} item(s)`})
          this.previousCountLenghtImg = this.changeSelectedImg.length
        }
      }
    },

    ///Следим за изменением, и вызываем алерт если вьюкс изменился
    alertText(){
      this.dismissCountDown = this.dismissSecs // запустить оповещение
      this.messageNotifications = this.$store.getters["FileManager/textNotifications"];
    },


  },
  mounted() {
  this.previousCountLenghtImg = this.changeSelectedImg.length;
  }

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
  text-shadow: 1px 1px 1px #adb5bd;

}

</style>