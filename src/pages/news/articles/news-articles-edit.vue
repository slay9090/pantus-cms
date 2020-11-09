<template>
  <div>

    <div class="d-flex align-items-start">

      <div class="card col-7 p-0  mr-5" id="tbl" >
        <h4 class="card-header"> <small class="text-muted">Редактирование статей</small></h4>
        <div class="card-body">

          <div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

              <b-form-group id="input-group-1" label="ID:" label-for="input-1">
                <b-form-input
                    readonly
                    id="input-1"
                    v-model="form.id"
                    required

                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Name:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.name"
                    required
                    placeholder="Enter brand name"
                    autofocus
                ></b-form-input>
              </b-form-group>

              <b-form-group v-if="content" id="body" label="body:" label-for="bodytext">

                    <editor
                        api-key="gqpfxv5x5qu51tfngt21fta5oyzrbn4ncpirg46a13hlomt0"
                        :init=myinit
                        :initial-value=content
                    />


              </b-form-group>


              <b-button type="submit" variant="danger" class="">Удалить</b-button>
              <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
              <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>
            </b-form>

          </div>

        </div>
      </div>


      <div class="d-flex card col-4 p-0 " id="treechild" >
        <h4 class="card-header"> <small class="text-muted">Формализованный запрос</small></h4>
        <div class="card-body">
          <pre class="m-0">{{ form }}</pre>
        </div>
      </div>

    </div>

  </div>
</template>

<script>


import Editor from '@tinymce/tinymce-vue'


export default {
props: ["query"],
name: "FormEdit",

  components: {
    'editor': Editor,

  },

  data() {
    return {
      form: {
        id: '',
        name: '',
        content: '',
      },
      show: true,
      content: '',



  myinit:{
    height: 500,
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
      console.log(blobInfo.filename())
      formData =  new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
       xhr.send(formData);
      await success('https://www.pantus.ru/images_uploader/images/'+blobInfo.filename())
    }
  },
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      //this.form.id = ''
      this.form.name = ''

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },

  async mounted() {
    await this.$store.dispatch("NewsArticles/GetDetalail", this.query );
    let data = await this.$store.getters["NewsArticles/AllItems"]; // getTodoById(Number(this.query))
    this.form.name = data.name;
    this.form.id = data.id;
    this.content= data.content;
    console.log(this.content)

  },

}
</script>

<style scoped>

</style>
