<template>
  <div class="input-catalog form-control d-flex justify-content-between" >


    <div class="d-flex flex-column justify-content-center ">
      <div class=""><i class="fa fa-chevron-left ico-navigate" aria-hidden="true" @click="prevSlide"></i></div>
    </div>


    <div class="mx-1 w-100 " >
      <b-carousel
          id="carousel-1"
          class="image-carousel-block"
          v-model="slide"
          :interval=0
          indicators
          :style="`height: ${heighBlock}px;`"
          no-animation
          ref="myCarousel"
      >

        <b-carousel-slide v-for="(item, index) in images" :key="index">

          <template v-slot:img>

            <div v-if="!imgIsNotExist && index===0" class="overlay"><i class="fa fa-check-square icon-bookmark"></i>
            </div>

            <img v-if="index===0"
                 :style="`max-height: ${heighBlock}px;`"
                 class="w-100"
                 :src=item
                 alt="main image"
                 @error="hasImgError()"
            >

            <img v-else
                 :style="`max-height: ${heighBlock}px;`"
                 class="w-100"
                 :src=item
                 alt="album image"
            >

          </template>

        </b-carousel-slide>
      </b-carousel>


    </div>

    <div class="d-flex flex-column justify-content-center ">



      <div class=""><i class="fa fa-chevron-right ico-navigate" aria-hidden="true" @click="nextSlide"></i></div>

    </div>
    <div class="d-flex flex-column ">

<!--      <div class=""><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" @click="imageUpload"></i></div>-->

    </div>

  </div>
</template>

<script>


export default {
  components: {
  },
  name: "image-carousel",
  props: {
    images: {
      type: Array
    },
    heighBlock: {
      type: String,
      default: '400',
    }
  },

  data() {
    return {
      slide: 0,
      sliding: null,
      imgIsNotExist: false,
    }
  },

  methods: {
    hasImgError() {
      this.imgIsNotExist = true
    },

    nextSlide() {
      this.$refs.myCarousel.next()
    },
    prevSlide() {
      this.$refs.myCarousel.prev()
    },

  },
}
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 1%;
  left: 1%;
  /*width: 10%;*/
  height: auto;
  text-align: left;

}

.input-catalog.form-control{
  height: auto !important;
  /*background-color: #e9ecef;*/
}

.icon-bookmark {
  /*display: flex;*/
  position: absolute;
  cursor: default;
  color: lightgray;
  opacity: 0.5;
  /*width: 100%;*/
  font-size: 1.5vw;
}

.ico-navigate  {
  cursor: pointer;
  color: #007bff;
  opacity: 0.6;
  font-size: 1.5vw;

}

i:hover{
  opacity: 1;
}

.image-carousel-block {
  text-shadow: 1px 1px 2px #333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>