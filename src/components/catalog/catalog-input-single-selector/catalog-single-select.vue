<template>
  <b-modal
            v-if="itemSelectProductBrand"
           @hidden="handleResetTempData"
           :id="modalId"
           :title="modalTitleName"
           size="lg"
           centered
           no-fade
           no-close-on-backdrop
           no-close-on-esc
           ok-title="Сохранить">

    <div class="">
      <div class="mt-0">
        <div class="wrap">
          <div class="search">
            <input type="text" class="searchTerm" placeholder="Поиск по брендам" @input="filteredList"
                   v-model="inputSearchText">
            <button type="submit" class="searchButton">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <hr>

      <div class="mt-3 ">

        <RecycleScroller
            class="scrollblock"
            :items="filteredList()"
            :item-size="30"
            key-field="id"
            v-slot="{ item }"
            content-tag="b-form-radio-group"
        >
          <div class="ml-2" >
            <b-form-radio v-model="selectItemId" :value="item.id" @change="setSelectItems(item)">
              {{ item.name }}
            </b-form-radio>
          </div>
        </RecycleScroller>
      </div>

    </div>

    <template v-slot:modal-footer>
      <div class="w-100">

        <b-button
            variant="primary"
            class="float-left "
            @click="handleOk"
        >
          Сохранить
        </b-button>
        <b-button

            variant=""
            class="float-left mx-3"
            @click="handleCancel"
        >
          Отмена
        </b-button>

      </div>
    </template>

  </b-modal>

</template>

<script>


export default {

  name: "catalog-radiobutton-select",

  props: {
    id: {
      type: String,
      required: true,

    },
    items: {
      type: Array
    },
    modalId: {
      type: String,
      required: true,
    },
    modalTitleName: {
      type: String,
      default: 'Выбор значения'
    }
  },

  data() {
    return {
      inputSearchText: '',
      selectItem: null,
      selectItemId: null,
    }
  },

  computed: {

    itemSelectId: {
      get() {

        return this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id) ? this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id).id : null
      },
    },

    itemSelectProductBrand() {
      return this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id)

    },

  },

  methods: {

    filteredList() {
      if (this.items) {
        return this.items.filter(post => {
          return post.name.toLowerCase().includes(this.inputSearchText.toLowerCase())
        })
      }
    },

    setSelectItems(item) {
      this.selectItem = item
    },

    handleOk(bvModalEvt) {

      bvModalEvt.preventDefault()
      this.$store.commit('TempDataCatalog/setValueInputCatalog', {'key': this.id, 'value': this.selectItem})
      this.$nextTick(() => {
        this.$bvModal.hide(this.modalId)
      })
    },

    handleCancel(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.selectItemId = this.itemSelectId
      this.$nextTick(() => {
        this.$bvModal.hide(this.modalId)
      })
    },

    handleResetTempData(){
      this.inputSearchText = '';
    }


  },
  async mounted() {

     this.selectItemId = await this.itemSelectId                     // Если будут траблы с начальным значением раскоментить

  },

  watch: {
    itemSelectId () {
      this.selectItemId = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id).id
    }
  },

}
</script>

<style scoped>
.scrollblock {


  height: 500px;
  width: 100%;
  overflow-y: auto;

}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 40%;

  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 36px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus {
  color: #00B4CC;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
</style>