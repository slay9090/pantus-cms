<template>

<div >
  <b-modal

      id="modal-catalog-edit"
      title="BootstrapVue"
      size="lg"
      centered no-fade no-close-on-backdrop no-close-on-esc
      ok-title="Сохранить">

          <div v-if="typeContent==='Brand'" class="">
            <div class="mt-0">
              <div class="wrap">
                <div class="search">
                  <input type="text" class="searchTerm" placeholder="What are you looking for?" @input="filteredList" v-model="inputSearchText">
                  <button type="submit" class="searchButton">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            <hr>


              <div class="mt-3 " >

            <RecycleScroller
                class="scrollblock"
                :items="filteredList()"
                :item-size="30"
                key-field="id"
                v-slot="{ item }"
                content-tag="b-form-radio-group"
            >
              <div class="ml-2">
                  <b-form-radio v-model.lazy="itemSelectProductBrand[0].id"   :value="item.id" @change="setSelectItems(item)">{{ item.name }}</b-form-radio>
              </div>
            </RecycleScroller>

            </div>

          </div>


          <div v-if="typeContent==='Categories'">
            <div class="scrollblock" >
                <checkboxtree   v-for="item in items" :node="item" :key="item.id" :type-content="typeContent"
                ></checkboxtree>
            </div>
          </div>

          <div v-if="typeContent==='applicabilities'">
            <div class="scrollblock" >
              <checkboxtree   v-for="item in items" :node="item" :key="item.id" :type-content="typeContent"
              ></checkboxtree>
            </div>
          </div>



    <template v-slot:modal-footer>
      <div class="w-100">
        <div v-if="typeContent==='Brand'">
          <p class="float-left"><b>Текущее значение: </b>
            <span  v-for= "(item, index) in itemSelectProductBrand" :key="index">{{item.name}}, </span>
          </p>
        </div>
        <div v-if="typeContent==='Categories'">
          <p class="float-left"><b>Текущее значение: </b>
          <span  v-for= "(item, index) in itemSelectProductCategories" :key="index">{{item.name}},  </span>
          </p>
        </div>
        <div v-if="typeContent==='applicabilities'">
          <p class="float-left"><b>Текущее значение: </b>
            <span  v-for= "(item, index) in itemSelectProductApplicabilities" :key="index">{{item.name}},  </span>
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

import checkboxtree from "./tree"

export default {
  name: "checkBoxForm",
  components:{
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

  computed:{
    itemSelectProductBrand(){
      return this.$store.getters["ProductParts/selectedBrands"]
    },

    itemSelectProductCategories(){
      return this.$store.getters["ProductParts/selectedCategories"]
    },

    itemSelectProductApplicabilities(){
      return this.$store.getters["ProductParts/selectedApplicabilities"]
    },

  },
  methods:{
    filteredList() {
      return this.items.filter(post => {
        return post.name.toLowerCase().includes(this.inputSearchText.toLowerCase())
      })
    },
    setSelectItems(item){
      this.selectItems = item
      console.log ('this.selectItems ',this.selectItems)
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()

      switch (this.typeContent) {
        case 'Brand':
            this.$store.commit("ProductParts/clearItemSelectedBrands")
            this.$store.commit('ProductParts/addItemSelectedBrands', this.selectItems)
          break;

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
        this.$bvModal.hide('modal-catalog-edit')
      })
    },

    handleCancel(bvModalEvt){
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
          this.$bvModal.hide('modal-catalog-edit')
        })
    },

   },

 async mounted() {
 }

}
</script>

<style scoped>



.scroller {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}



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

.searchTerm:focus{
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
