<template>

  <div>
    <b-modal

        id="modal-input-catalog"
        title="BootstrapVue"
        size="lg"
        centered no-fade no-close-on-backdrop no-close-on-esc
        ok-title="Сохранить">

   


      <div v-if="typeContent==='Categories'">
        <div class="scrollblock">
          <checkboxtree v-for="item in items" :node="item" :key="item.id" :type-content="typeContent"
          ></checkboxtree>
        </div>
      </div>

      <div v-if="typeContent==='applicabilities'">
        <div class="scrollblock">
          <checkboxtree v-for="item in items" :node="item" :key="item.id" :type-content="typeContent"
          ></checkboxtree>
        </div>
      </div>


      <template v-slot:modal-footer>
        <div class="w-100">

          <div v-if="typeContent==='Categories'">
            <p class="float-left"><b>Текущее значение: </b>
              <span v-for="(item, index) in itemSelectProductCategories" :key="index">{{ item.name }},  </span>
            </p>
          </div>
          <div v-if="typeContent==='applicabilities'">
            <p class="float-left"><b>Текущее значение: </b>
              <span v-for="(item, index) in itemSelectProductApplicabilities" :key="index">{{ item.name }},  </span>
            </p>
          </div>


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

import checkboxtree from "./catalog-tree-multi-select-node"

export default {
  name: "checkBoxForm",
  components: {
    checkboxtree,
  },
  props: {
    items: Array,
    typeContent: String,
  },

  data() {
    return {
      inputSearchText: '',
      selectItems: '',
    }
  },

  computed: {


    itemSelectProductCategories() {
      return this.$store.getters["ProductParts/selectedCategories"]
    },

    itemSelectProductApplicabilities() {
      return this.$store.getters["ProductParts/selectedApplicabilities"]
    },

  },
  methods: {
    filteredList() {
      return this.items.filter(post => {
        return post.name.toLowerCase().includes(this.inputSearchText.toLowerCase())
      })
    },
    setSelectItems(item) {
      this.selectItems = item
      console.log('this.selectItems ', this.selectItems)
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()

      switch (this.typeContent) {


        case 'Categories':
          console.log(this.itemSelectProductCategories)
          this.$store.commit("ProductParts/setDataCurrentCategoriesByPart", this.itemSelectProductCategories) // подгружаем в текущие // variable *//push
          // console.log(this.$store.getters["ProductParts/currentCategoriesByPart"])
          // this.itemSelectProductCategories.forEach(element => this.$store.commit("ProductParts/addItemSelectedCategories", element)); //запись селектов

          break;

        case 'applicabilities':
          console.log('asasdd')
          this.$store.commit('ProductParts/setDataCurrentApplicabilitiesByPart', this.itemSelectProductApplicabilities)

          break;

        default:
          console.log('Такого типа модального окна не существует')
      }

      this.$nextTick(() => {
        this.$bvModal.hide('modal-input-catalog')
      })
    },

    handleCancel(bvModalEvt) {
      bvModalEvt.preventDefault()

      if (this.typeContent === 'Categories') {
        this.$store.commit("ProductParts/clearItemSelectedCategories"); //
        this.$store.getters["ProductParts/currentCategoriesByPart"]
            .forEach(element => this.$store.commit("ProductParts/addItemSelectedCategories", element)); //запись селектов на текущие
      }

      if (this.typeContent === 'applicabilities') {
        this.$store.commit('ProductParts/clearItemsSelectedApplicabilities');
        this.$store.getters["ProductParts/currentApplicabilitiesByPart"]
            .forEach(element => this.$store.commit("ProductParts/addItemSelectedApplicabilities", element)); //запись селектов на текущие
      }

      this.$nextTick(() => {
        this.$bvModal.hide('modal-input-catalog')
      })
    },

  },

  async mounted() {
  }

}
</script>

<style scoped>

</style>
