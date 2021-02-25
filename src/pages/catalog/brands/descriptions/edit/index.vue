<template>
  <b-container fluid>




    <b-card-group deck>


      <b-card title="Редактирование описания" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>

          <h6 class="mb-0">Описание</h6>
        </template>

        <b-card-text>

            <b-overlay :show="spinerLoaderIsShow">

<!--              {{descriptionDetailItem}}-->

          <ValidationObserver>

            <b-form @submit.prevent="validate().then(onSubmit(valid))" slot-scope="{ validate, valid }"
                    class="order-form">

              <b-form-group

                  label=""
                  label-size="md"
                  label-class="font-weight-bold pt-0"
                  label-cols-lg="12"
                  v-if="descriptionDetailItem"
                  readonly
              >


                <BTextInput
                    rules="required"
                    type="number"
                    label="id:"
                    name="id"
                    v-model="descriptionDetailItem.id"
                    placeholder="введите ид опсания"
                    readonly

                />

                <BTextInput
                    rules="required"
                    type="text"
                    label="code:"
                    name="code"
                    v-model="descriptionDetailItem.code"
                    placeholder="введите слаг"
                    readonly
                />

                <BTextInput
                    rules="required"
                    type="text"
                    label="aliases:"
                    name="aliases"
                    v-model="descriptionDetailItem.aliases"
                    placeholder="введите ид брендов"
                    readonly
                />


                <BHtml
                    name="descriptionText"
                    rules="required"
                    v-model="descriptionDetailItem.description"

                />


              </b-form-group>


<!--              <a :href="`https://site.pantus.ru/brands/${initBrandCode}`"-->
<!--                 target="_blank">{{ `https://site.pantus.ru/brands/${initBrandCode}` }}</a>-->

              <hr>


              <b-row class="button-group justify-content-between mt-4 mt-xl-0" align-v="end">
                <b-col>
                  <b-row class="unsave-button " cols-xl="2" align-v="end">
                    <b-col order="1" class="" xl="auto">
                      <b-button type="submit" variant="danger" class=""> Удалить</b-button>
                    </b-col>
                    <b-col order="2" xl="auto" class="mt-3">
                      <b-button type="reset" variant="secondary" class="">Сбросить</b-button>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col class="text-right">
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

import {createNamespacedHelpers} from 'vuex'
const {mapGetters, mapActions} = createNamespacedHelpers('CatalogBrands')

export default {
  name: "index",

  data(){
    return{
      spinerLoaderIsShow: true,
    }
  },

  methods: {
    async onSubmit(valid) {

      if (valid) {
        // await this.$store.dispatch('CrmOrders/sendFormOrder', this.$route.params.id)
        // await this.dataInit();
      } else {
        this.$globalFunc.setAlertMessage('danger', 'не валидная форма');
      }
    },

    onReset(evt) {
      evt.preventDefault()
      this.$nextTick(() => {

      })
    },

    ...mapActions(["getDescriptionDetailItem"])

  },

  computed: {
    ...mapGetters(["descriptionDetailItem"]),
  },

 async mounted() {
   await this.getDescriptionDetailItem(this.$route.params.id)

   this.spinerLoaderIsShow = false;
  }


}
</script>

<style scoped>

</style>