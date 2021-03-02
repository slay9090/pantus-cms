<template>
  <ValidationProvider :vid="vid" :name="$attrs.name" :rules="rules">
    <b-form-group
        slot-scope="{ valid, errors }"
        v-bind="$attrs"
    >
      <editor
          api-key="gqpfxv5x5qu51tfngt21fta5oyzrbn4ncpirg46a13hlomt0"
          :init="myinit"
          v-model="innerValue"
          v-bind="$attrs"

      />
      <div v-if="errors[0]" class="invalid-validation">
        {{ errors[0] }}
      </div>

<!--      <b-form-invalid-feedback id="inputLiveFeedback" v-if="errors[0]">-->
<!--        {{ errors[0] }}-->
<!--      </b-form-invalid-feedback>-->
    </b-form-group>
  </ValidationProvider>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
name: "BHtml",
  components:{
    'editor': Editor,
  },
  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    // must be included in props
    value: {
      type: null
    },

  },
  data: () => ({
    innerValue: '',
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
        xhr.open('POST', 'https://bx.pantus.ru/images_uploader/script.php');
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
        await success('https://bx.pantus.ru/images_uploader/images/'+blobInfo.filename())
      }
    },

  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
}
</script>

<style scoped>
.tox-notifications-container {
  display: none !important;
}

.invalid-validation{
  width: 100%;
  margin-top: .25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>