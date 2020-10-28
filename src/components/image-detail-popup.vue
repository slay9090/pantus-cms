<template>

  <div>
      <b-modal

               id="modal-multi-2"
          title="Image Detail"
          ok-only
          size="lg"
         centered
          hide-footer
               ref="my-modal"

      >
        <div class="lines ">
          <div class="text-break border-bottom">Ссылка: {{image.url}} </div>
          <div class="text-break border-bottom">Разрешение: {{image.width+'x'+image.height}}</div>
          <div class="text-break border-bottom">Размер файла: {{ (image.size/1024).toFixed(2)}} кб.</div>
        </div>
              <div class="d-flex justify-content-center align-items-center image-space-block" style="height: 600px">
                <b-img thumbnail fluid :src=image.url :alt="'image'" style="max-height: 100%; max-width: 100%"></b-img>
              </div>

      </b-modal>
  </div>



</template>

<script>
export default {
name: "ImagePopup",

  props: {
  image:{},
  },

  data(){
    return{
      //urlImage:
    }
  },

  methods: {

  },
  mounted() {
  console.log('I OPEN AI' + this.image.url)
  }
}
</script>

<style scoped>
.lines {

}
</style>