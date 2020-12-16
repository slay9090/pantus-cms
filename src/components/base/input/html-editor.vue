<template>
  <editor
      api-key="gqpfxv5x5qu51tfngt21fta5oyzrbn4ncpirg46a13hlomt0"
      :init="myinit"
      v-model="valueHtmlEditor"

  />
</template>

<script>
// :initial-value="content" - начальный текст ес чё.
import Editor from '@tinymce/tinymce-vue'

export default {
name: "html-editor",
  components:{
    'editor': Editor,
  },

  props: {
  id: {
    type: String,
    required: true,
  },


  },

  data(){
  return{
    myinit:{
      height: 800,
      menubar: true,

      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount advcode'
      ],
      toolbar:
          'undo redo | formatselect | bold italic backcolor image | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent code | removeformat | help | fullscreen',


      images_upload_credentials: true,

      images_upload_handler: async function (blobInfo, success, failure) {
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'https://www.pantus.ru/images_uploader/script.php');
        xhr.onload = function() {
          var json;

          if (xhr.status !== 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.location != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
          success(json.location);
        };
      //  console.log(blobInfo.filename())
        formData =  new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
        await success('https://www.pantus.ru/images_uploader/images/'+blobInfo.filename())
      }
    },

  }
  },


  computed: {

    valueHtmlEditor: {
      get() {
        return this.$store.getters["BaseComponents/getValueHtmlEditor"](this.id)
      },
      set(val) {
        //запустить валидацию
        this.$store.commit('BaseComponents/setValueHtmlEditor', {'key': this.id, 'value': val})
       // val === 'q' ? this.isValid = false : this.isValid = null
      },

    }

  },


}
</script>

<style>
.tox-notifications-container {
  display: none !important;
}
</style>