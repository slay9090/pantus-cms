<template>
    <b-container fluid>
      <b-card-group deck>


        <b-card title="Создание описания" header-tag="header" footer-tag="footer" class="shadow">
          <template #header>

            <h6 class="mb-0">Описание</h6>
          </template>

          <b-card-text>

            <b-overlay :show="spinerLoaderIsShow">


              <ValidationObserver>

                <b-form @submit.prevent="validate().then(onSubmit(valid))" slot-scope="{ validate, valid }"
                        class="order-form">

                  <b-form-group

                      label=""
                      label-size="md"
                      label-class="font-weight-bold pt-0"
                      label-cols-lg="12"
                      v-if="!spinerLoaderIsShow"
                      readonly
                  >

                    <BSlugInput
                        rules="required"
                        type="text"
                        label="code:"
                        name="Code"
                        v-model="formData.code"
                        :value-by-watch="formData.code"
                        placeholder="Введите название"

                    />


                    <check-box
                        label="Бренды:"
                        v-model="formData.aliases"
                        :items="allItems"
                        readonly
                    >
                      <template #values>
                        {{formData.aliases}}
                      </template>

                      <template v-slot="scope">
                        <b-button @click="scope.open">Add</b-button>
                      </template>
                    </check-box>


                    <BHtml
                        name="descriptionText"
                        rules="required"
                        v-model="formData.description"

                    />


                    <template v-if="!spinerLoaderIsShow">
                      <h6>Связанные с этим описанием Бренды:</h6>
                      <span
                          v-for="(item, index) in formData.aliases"
                          :key="index"
                      >
                     <router-link :to="{ name: 'BrandsEdit', params: { id: item }}">
                        {{ `https://adm.pantus.ru/catalog/brands/edit/${item}` }}
                     </router-link>
                         ({{getBrandsNameById(item)}})
                    <i class="fa fa-times deleted-icon" aria-hidden="true" @click="removeItemFromAliases(index)"></i>
                    <br>
                  </span>

                    </template>

                  </b-form-group>


                  <hr>


                  <b-row class="button-group justify-content-between mt-4 mt-xl-0" align-v="end">
                    <b-col>
                      <b-button type="reset" variant="secondary" class="">Сбросить</b-button>
                    </b-col>
                    <b-col class="text-right pl-0">
                      <b-button type="submit" variant="primary" :disabled="!valid" class="">Сохранить</b-button>
                    </b-col>
                  </b-row>


                </b-form>

              </ValidationObserver>

            </b-overlay>
          </b-card-text>


        </b-card>


      </b-card-group>
    </b-container>
</template>

<script>
import {createNamespacedHelpers} from "vuex";
import CheckBox from "@/components/check-box/input";
const {mapActions, mapGetters} = createNamespacedHelpers('CatalogBrands')
    export default {
        name: "index",
      components: {CheckBox},
      data() {
        return {
          spinerLoaderIsShow: true,
          formData: {
                code: null,
                aliases: [],
                description: null
          }
        }
      },
      
      methods: {

        getBrandsNameById(id){
          const name =  this.allItems
              .filter(elem => elem.id === id)
              .map(elem => {return elem.name})
          return  name.length > 0 ?   name[0] : id
        },

        removeItemFromAliases(index) {
          const aliases = this.formData.aliases
          aliases.splice(index, 1)
          this.formData.aliases = aliases.toString()
        },

        async onSubmit(valid) {

          if (valid) {
            this.spinerLoaderIsShow = true


            await this.sendFormDescriptionAdd(this.formData)

            this.spinerLoaderIsShow = false

          } else {
            this.$globalFunc.setAlertMessage('danger', 'не валидная форма');
          }
        },

        onReset(evt) {
          evt.preventDefault()
          this.$nextTick(() => {

          })
        },

        ...mapActions(["getDataAllItems","sendFormDescriptionAdd"])

      },
      
      computed: {
        ...mapGetters(["allItems"]),
      },
      async mounted() {
          await this.getDataAllItems();
          this.spinerLoaderIsShow = false;
      }

    }
</script>

<style scoped>
.deleted-icon {
  color: #dc3545;
  cursor: pointer;
}

.deleted-icon:hover {
  color: #c82333;
}
</style>