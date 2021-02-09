<template>

<b-container fluid>

  <b-row>

    <b-col xl="5" lg="7" >

      <b-card header-tag="header" class="shadow">
        <template #header>
          <h4><small class="text-muted">Заказ</small></h4>
        </template>
        <b-overlay :show="initFailed" no-fade rounded="sm">
        <b-card-text v-if="!initFailed">


          <ValidationObserver >

          <b-form @submit.prevent="validate().then(onSubmit(valid))" slot-scope="{ validate, valid }" class="order-form">

            <b-form-group

                label="Заказ:"
                label-size="md"
                label-class="font-weight-bold pt-0"
                label-cols-lg="12"
            >



                <BTextInput
                    label-align-sm="right"
                    label-cols-sm="3"
                    label-cols-lg="4"
                    rules="required"
                    type="number"
                    label="id:"
                    name="orderId"
                    v-model="orderDetail.id"
                    placeholder="111111"
                    readonly
                />


              <BTextInput
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules=""
                  type="text"
                  label="Сумма:"
                  name="price"
                  v-model="orderDetail.price"
                  placeholder="₽ 0.00"
                  :mask="maskPrice"
                  readonly

              />


              <BTextArea
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules=""
                  type="text"
                  label="Комментарий менеджера:"
                  name="commentsAdmin"
                  v-model="orderDetail.comments.admin"
                  placeholder="Введите комментарий"
                  rows="1"
                  max-rows="3"
                  readonly
              />

              <BTextArea
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules=""
                  type="text"
                  label="Комментарий клиента:"
                  name="commentsUser"
                  v-model="orderDetail.comments.user"
                  placeholder="Введите комментарий"
                  rows="1"
                  max-rows="3"
                  readonly
              />

              <BSelect
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules="required"
                  name="orderStatus"
                  label="Статус:"
                  v-model="orderDetail.orderStatus.code"
                  >
                  <b-form-select-option v-for="(item, index) in statuses" :key="index" :value="item.code">
                    {{ item.name }}
                  </b-form-select-option>
              </BSelect>
            </b-form-group>

          <hr>

            <b-form-group
                label="Пользователь:"
                label-size="md"
                label-class="font-weight-bold pt-0"
                label-cols-lg="12"
            >

              <BTextInput
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules="required"
                  type="number"
                  label="id:"
                  name="userId"
                  v-model="orderDetail.userId"
                  placeholder="Введите ID"
                  readonly
              />

              <BTextInput
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules="alpha"
                  type="text"
                  label="Имя:"
                  name="userFirstName"
                  v-model="orderDetail.userName.firstName"
                  placeholder="Введите имя"
                  readonly
              />

              <BTextInput
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules="alpha"
                  type="text"
                  label="Фамилия:"
                  name="userLastName"
                  v-model="orderDetail.userName.lastName"
                  placeholder="Введите фамилию"
                  readonly
              />

              <BTextInput
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules=""
                  type="text"
                  label="Телефон:"
                  name="userPhone"
                  v-model="orderDetail.userPhone"
                  readonly
              />

              <BSelect
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules="required"
                  name="orderStatus"
                  label="Тип:"
                  v-model="orderDetail.userType.id"
                  @input="setConformityDelivery"
                  disabled

              >
                <b-form-select-option :value="1">розница</b-form-select-option>
                <b-form-select-option :value="2">опт</b-form-select-option>
              </BSelect>

            </b-form-group>

            <hr>

            <b-form-group
                label="Доставка:"
                label-size="md"
                label-class="font-weight-bold pt-0"
                label-cols-lg="12"
            >

              <BTextInput
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules=""
                  type="text"
                  label="Город:"
                  name="deliveryCity"
                  v-model="orderDetail.address.city"
                  placeholder="Введите город"
                  readonly
              />

              <BTextArea
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules=""
                  type="text"
                  label="Улица:"
                  name="deliveryDetailed"
                  v-model="orderDetail.address.detailed"
                  placeholder="Введите адрес"
                  readonly
              />

              <BTextInput
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules="integer"
                  type="text"
                  label="Код трекинга:"
                  name="trackingCode"
                  v-model="orderDetail.delivery.trackingCode"
                  placeholder="Введите Идентификатор отправления"
              />

              <BTextInput
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules="is_not:₽ "
                  type="text"
                  label="Стоимость:"
                  name="deliveryPrice"
                  v-model="orderDetail.delivery.price"
                  placeholder="₽ 0.00"
                  :mask="maskPrice"
              />

              <BSelect
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules="required"
                  name="deliveryService"
                  label="Способ:"
                  v-model="orderDetail.delivery.service.id"
                  @input="setConformityPayment"
              >
                <b-form-select-option v-for="(item, index) in deliveryService" :key="index" :value="item.id" :disabled="!item.active">
                  {{ item.name }}
                </b-form-select-option>
              </BSelect>

              <BRadio
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  name="deliveryActive"
                  rules="required"
                  label="Активна:"
                  v-model="orderDetail.delivery.allow"
              >
                <b-form-radio size="lg" :value="true" >Да</b-form-radio>
                <b-form-radio size="lg" :value="false">Нет</b-form-radio>
              </BRadio>



            </b-form-group>

            <hr>

            <b-form-group
                label="Оплата:"
                label-size="md"
                label-class="font-weight-bold pt-0"
                label-cols-lg="12"
            >
              <BSelect
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules="required"
                  name="paySystem"
                  label="Способ:"
                  v-model="orderDetail.paySystem.id"
              >
                <b-form-select-option v-for="(item, index) in paymentSystems" :key="index" :value="item.id" :disabled="!item.active">
                  {{ item.name }}
                </b-form-select-option>
              </BSelect>





            </b-form-group>


            <hr>

            <b-form-group
                label="Дата:"
                label-size="md"
                label-class="font-weight-bold pt-0"
                label-cols-lg="12"
            >
              <BTextInput
                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules=""
                  type="text"
                  label="Создан:"
                  name="dateCreate"
                  v-model="orderDetail.dates.created"
                  readonly
              />
              <BTextInput

                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules=""
                  type="text"
                  label="Изменён:"
                  name="dateModified"
                  v-model="orderDetail.dates.modified"
                  readonly
              />
              <BTextInput

                  label-align-sm="right"
                  label-cols-sm="3"
                  label-cols-lg="4"
                  rules=""
                  type="text"
                  label="Статус:"
                  class="long-label"
                  name="dateStatusUpdate"
                  v-model="orderDetail.dates.statusUpdate"
                  readonly
              />


            </b-form-group>







            <b-row class="button-group justify-content-between mt-4 mt-xl-0" align-v="end" >
              <b-col  >
                <b-row class="unsave-button " cols-xl="2" align-v="end">
                  <b-col order="1" class="" xl="auto">
                    <b-button type="submit" variant="danger" class="" @click="msg"> Удалить </b-button>
                  </b-col>
                  <b-col order="2" xl="auto" class="mt-3">
                    <b-button type="reset" variant="secondary"  class="">Сбросить</b-button>
                  </b-col>
                </b-row>
              </b-col>

              <b-col   class="text-right" >
                <b-button type="submit" variant="primary" :disabled="!valid"  class="">Сохранить</b-button>
              </b-col>
            </b-row>



          </b-form>

            </ValidationObserver >
        </b-card-text>
        </b-overlay>
      </b-card>

    </b-col>


    <b-col xl="7" lg="5" >
      <b-card header-tag="header" class="shadow">
        <template #header>
          <h4><small class="text-muted">Позиции</small></h4>
        </template>
        <b-overlay :show="initFailed" no-fade rounded="sm">
        <b-card-text class="overflow-auto" v-if="!initFailed">



          <table-static

              v-if="orderDetail.offers"
              :id="identifierComponents.table.offers"
              :fields="fields"
              :per-page="10"
              class="offres-table w-100"
          />
          <span v-else>Нет товаров</span>

        </b-card-text>
        </b-overlay>
      </b-card>
    </b-col>

  </b-row>

</b-container>

</template>

<script>
import init from "./init";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
const currencyMask = createNumberMask({
  prefix: '₽ ',
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});

export default {
name: "index",
  mixins: [init,],

  data:() =>({
    fields: [
      {key: 'id', thStyle: {width: '70px'}},
      {key: 'guid', class:"d-xl-table-cell d-none",  label: 'guid', thStyle: {width: '90px'}},
      // { key: 'guidByOrder', label: 'guid_o'  ,  thStyle: {  width: '100px' }},
      { key: 'name', label: 'Имя'  ,  thStyle: {  width: '10px' }},
      {key: 'supplierCode', class:"d-xl-table-cell d-none", label: 'Код поставщика',  thStyle: {width: '90px'}},
      {key: 'price', label: 'Цена, руб.', thStyle: {width: '30px'}},
      {key: 'quantity', label: 'Кол-во', thStyle: {width: '30px'}},
      {key: 'priceTypeName', label: 'Тип прайса', thStyle: {width: '30px'}},

    ],

    maskPrice: currencyMask,

  }),

  computed: {

    orderDetail:{
      get(){

        return this.$store.getters["CrmOrders/itemDetailsById"]
      },
      set(val) {
        // console.log('asdasdasdad')
        // this.setConformity(this.deliveryService, this.$store.getters["CrmOrders/itemDetailsById"].delivery.service.id)
        this.$store.commit('CrmOrders/setDataDetailsItemById', {val})

      }
    },

    statuses(){
      return this.$store.getters["CrmOrders/statuses"]
    },

    deliveryService:{
      get(){return this.$store.getters["CrmOrders/deliveryServices"]},
      set(val){
        this.$store.commit('CrmOrders/setDataDeliveryService', {val})
      }

    },

    paymentSystems:{
      get(){return this.$store.getters["CrmOrders/paymentSystems"]},
      set(val)
      {
        this.$store.commit('CrmOrders/setDataPaymentSystems', {val})
      }

    },

    treeConformity(){
      return this.$store.getters["CrmOrders/tree_conformity"]
    },


  },


  methods: {

    msg(evt){
      evt.preventDefault()
      this.$globalFunc.setAlertMessage('warning', 'TEST');
    },

   async onSubmit(valid) {

      if(valid)
      {
        await this.$store.dispatch('CrmOrders/sendFormOrder', this.$route.params.id)
       await this.dataInit();
      }
      else{
        this.$globalFunc.setAlertMessage('danger', 'не валидная форма');
      }
    },

    onReset(evt) {
      evt.preventDefault()
      this.$nextTick(() => {

      })
    },

    setConformityDelivery(){

      this.orderDetail.delivery.service.id = null;

      const arrToUserIds = this.treeConformity.filter(elem => elem.user_type_id === this.orderDetail.userType.id);
      for (const key in this.deliveryService) {
        const count = arrToUserIds.filter(rules => rules.delivery_type_id === this.deliveryService[key].id);
        if (count.length !== 0) {
          this.deliveryService[key].active = true
        }
        else {
          this.deliveryService[key].active = false
        }
      }
    },

    setConformityPayment(){

      this.orderDetail.paySystem.id = null;

      const arrToDeliveryIds = this.treeConformity.filter(elem => elem.delivery_type_id === this.orderDetail.delivery.service.id && elem.user_type_id === this.orderDetail.userType.id);
      for (const key in this.paymentSystems) {
        const count = arrToDeliveryIds.filter(rules => rules.paysystem_type_id === this.paymentSystems[key].id);
        if (count.length !== 0) {
          this.paymentSystems[key].active = true
        }
        else {
          this.paymentSystems[key].active = false
          // console.log(this.paymentSystems[key])
        }
      }
    },


  },


  mounted() {
    this.dataInit();
  },

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans+Caption&display=swap');


.form-label{
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
}

.offres-table{
  font-size: 12px;
  font-family: 'PT Sans Caption', sans-serif;
  /*font-weight: 500;*/
}

#__BVID__164__BV_label_{
  display: flex;
  align-items: center;
}
</style>