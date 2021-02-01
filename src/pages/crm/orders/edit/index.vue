<template>

<b-container fluid>

  form
  {{formData.orderPrice}}

  <b-row>

    <b-col >

      <b-card header-tag="header">
        <template #header>
          <h4><small class="text-muted">Заказ</small></h4>
        </template>

        <b-card-text>

          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group

                label="Заказ:"
                label-size="md"
                label-class="font-weight-bold pt-0"
                label-cols-lg="12"
            >

              <b-form-group label-align-sm="right" label-cols-sm="3" label="Id:" :label-for="identifierComponents.input.id">
                <input-index
                    readonly
                    :id="identifierComponents.input.id"
                    v-model="formData.id"
                    required
                >
                </input-index>
              </b-form-group>

              <b-form-group label-align-sm="right" label-cols-sm="3" label="Сумма:" :label-for="identifierComponents.input.orderPrice" class="form-label">
                <input-price
                    :id="identifierComponents.input.orderPrice"
                    v-model="formData.orderPrice"
                >
                </input-price>
              </b-form-group>

              <b-form-group label-align-sm="right" label-cols-sm="3" label="Комментарий менеджера:" :label-for="identifierComponents.input.commentsAdmin" class="form-label">
                <text-area
                    :id="identifierComponents.input.commentsAdmin"
                    v-model="formData.commentsAdmin"

                >
                </text-area>
              </b-form-group>

              <b-form-group label-align-sm="right" label-cols-sm="3" label="Комментарий пользователя:" :label-for="identifierComponents.input.commentsUser" class="form-label">
                <text-area
                    :id="identifierComponents.input.commentsUser"
                    v-model="formData.commentsUser"
                >
                </text-area>
              </b-form-group>

            </b-form-group>


          <hr>


            <b-form-group
                label="Пользователь:"
                label-size="md"
                label-class="font-weight-bold pt-0"
                label-cols-lg="12"
            >

              <b-form-group label-align-sm="right" label-cols-sm="3" label="Id:" :label-for="identifierComponents.input.userId">
                <input-index
                    readonly
                    :id="identifierComponents.input.userId"
                    v-model="formData.userId"
                    required
                >
                </input-index>
              </b-form-group>

              <b-form-group label-align-sm="right" label-cols-sm="3" label="Имя:" :label-for="identifierComponents.input.userFirstName">
                <input-text
                    :id="identifierComponents.input.userFirstName"
                    v-model="formData.userFirstName"
                >
                </input-text>
              </b-form-group>

              <b-form-group label-align-sm="right" label-cols-sm="3" label="Фамилия:" :label-for="identifierComponents.input.userLastName">
                <input-text
                    :id="identifierComponents.input.userLastName"
                    v-model="formData.userLastName"
                >
                </input-text>
              </b-form-group>

              <b-form-group label-align-sm="right" label-cols-sm="3" label="Телефон:" :label-for="identifierComponents.input.userPhone">
                <input-phone
                    :id="identifierComponents.input.userPhone"
                    v-model="formData.userPhone"
                >
                </input-phone>
              </b-form-group>

            </b-form-group>






            <b-row class="button-group justify-content-between mt-4 mt-xl-0" align-v="end" >
              <b-col  >
                <b-row class="unsave-button " cols-xl="2" align-v="end">
                  <b-col order="1" class="" xl="auto">
                    <b-button type="submit" variant="danger" class="">Удалить</b-button>
                  </b-col>
                  <b-col order="2" xl="auto" class="mt-3">
                    <b-button type="reset" variant="secondary"  class="">Сбросить</b-button>
                  </b-col>
                </b-row>
              </b-col>

              <b-col   class="text-right" >
                <b-button type="submit" variant="primary" class="">Сохранить</b-button>
              </b-col>
            </b-row>

          </b-form>
        </b-card-text>

      </b-card>

    </b-col>


    <b-col >
      <b-card header-tag="header">
        <template #header>
          <h4><small class="text-muted">Позиции</small></h4>
        </template>
        <b-card-text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dicta dolor enim explicabo facilis illo illum ipsum libero magni maxime obcaecati odio, officiis perspiciatis, quam quasi quis ratione, reiciendis totam.
        </b-card-text>
      </b-card>
    </b-col>

  </b-row>

</b-container>

</template>

<script>
import init from "./init";

export default {
name: "index",
  mixins: [init,],
  data:() =>({

  }),

  computed: {
    formData() {
      const id = this.$store.getters["BaseComponents/getValueInputIndex"](this.identifierComponents.input.id);

      const userId = this.$store.getters["BaseComponents/getValueInputIndex"](this.identifierComponents.input.userId);
      const userFirstName = this.$store.getters["BaseComponents/getValueInputText"](this.identifierComponents.input.userFirstName);
      const userLastName = this.$store.getters["BaseComponents/getValueInputText"](this.identifierComponents.input.userLastName);
      const userPhone = this.$store.getters["BaseComponents/getValueInputPhone"](this.identifierComponents.input.userPhone);

      const orderPrice = this.$store.getters["BaseComponents/getValueInputPhone"](this.identifierComponents.input.orderPrice);
      const commentsAdmin = this.$store.getters["BaseComponents/getValueTextArea"](this.identifierComponents.input.commentsAdmin);
      const commentsUser = this.$store.getters["BaseComponents/getValueTextArea"](this.identifierComponents.input.commentsUser);

      // const name = this.$store.getters["BaseComponents/getValueInputText"](this.identifierComponents.input.name);
      // const brand = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.identifierComponents.input.brand);
      // const categories = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.identifierComponents.input.categories);
      // const applicabilities = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.identifierComponents.input.applicabilities);
      // const images = this.$store.getters["NewFileManager/getCurrentFiles"](this.identifierComponents.input.imageManagerId)
      // const offers = this.$store.getters["BaseComponents/getDataTable"](this.identifierComponents.table.offers) ? this.$store.getters["BaseComponents/getDataTable"](this.identifierComponents.table.offers) : []
      // const vendorCode = this.$store.getters["BaseComponents/getValueInputVendorCode"](this.identifierComponents.input.sku)
      // const activity = this.activity
      return {id, userId, userFirstName, userLastName, userPhone, orderPrice, commentsAdmin, commentsUser}
    },
  },

  methods: {

    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.formData))
    },

    onReset(evt) {
      evt.preventDefault()
      this.$nextTick(() => {

      })
    },


  },


  mounted() {
    this.dataInit();
  },

}
</script>

<style scoped>
.form-label{
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
}
</style>