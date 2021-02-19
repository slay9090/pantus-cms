<template>

  <b-container fluid>


    <b-card header-tag="header" class="shadow">
      <template #header>
        <h4><small class="text-muted">{{ initBrandName }}</small></h4>
      </template>
      <b-overlay :show="initFailed" no-fade rounded="sm">

        <b-card-text v-if="!initFailed">


          <ValidationObserver>

            <b-form @submit.prevent="validate().then(onSubmit(valid))" slot-scope="{ validate, valid }"
                    class="order-form">

              <b-form-group

                  label=""
                  label-size="md"
                  label-class="font-weight-bold pt-0"
                  label-cols-lg="12"
              >


                <BTextInput
                    rules="required"
                    type="number"
                    label="id:"
                    name="brandId"
                    v-model="formData.id"
                    placeholder="111111"
                    readonly
                />

                <BTextInput
                    rules="required"
                    type="text"
                    label="id:"
                    name="brandName"
                    v-model="formData.name"
                    placeholder="Name"
                />


                <BSlugInput
                    rules="required"
                    type="text"
                    label="code:"
                    name="brandCode"
                    v-model="formData.code"
                    :value-by-watch="formData.name"
                    placeholder="Code"
                />

                <BRadio

                    name="brandActive"
                    rules="required"
                    label="Активен:"
                    v-model="formData.active"
                >
                  <b-form-radio size="lg" :value="true">Да</b-form-radio>
                  <b-form-radio size="lg" :value="false">Нет</b-form-radio>
                </BRadio>

                <BHtml
                    name="brandDecs"
                    rules="required"
                    v-model="formData.description"
                />


              </b-form-group>


              <a :href="`https://site.pantus.ru/brands/${initBrandCode}`" target="_blank">{{`https://site.pantus.ru/brands/${initBrandCode}`}}</a>

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

        </b-card-text>
      </b-overlay>
    </b-card>

  </b-container>


</template>

<script>
import init from './init'

export default {
  mixins: [init,],
  data() {
    return {
      initBrandCode: '',
      initBrandName: '',
    }
  },

  computed: {
    formData: {
      get() {
        return this.$store.getters["CatalogBrands/detailsItem"]
      },
      set(val) {
        this.$store.commit('CatalogBrands/setDataDetailsItem', val)
      }

    },
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
  },

  mounted() {
    this.dataInit();

  }

};
</script>

