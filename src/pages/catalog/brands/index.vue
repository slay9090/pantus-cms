<template>

    <b-container fluid>

        <b-card-group deck>


            <b-card title="Список брендов" header-tag="header" footer-tag="footer" class="shadow">
                <template #header>
                    <!--          <h6> <small class="text-muted">Бренды</small></h6>-->
                    <h6 class="mb-0">Бренды</h6>
                </template>
                <b-card-text>

                    <b-row align-h="between" cols="1" cols-sm="2">

                        <b-col class="mb-3">
                            <b-row cols="1" cols-sm="2">
                                <b-col>
                                    <BTextInput
                                            v-model="searchValue"
                                            placeholder="Поиск"
                                            class="my-auto"
                                    />
                                </b-col>
                                <b-col>
                                    <b-button class="" :disabled="!searchValue" @click="searchValue=null">Clear
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-col>


                        <b-col>

                            <div class="d-flex justify-content-sm-end justify-content-between mb-3">
                                <b-button variant="outline-danger" class="mr-3 ">Удалить</b-button>
                                <b-button variant="outline-success" class="">Создать</b-button>
                            </div>

                        </b-col>

                    </b-row>


                    <table-static
                            id="catalog-brands-list"
                            :fields="fields"
                            :items="brandsList"
                            :is-load="spinerLoaderIsShow"
                            responsive="sm"
                            :per-page="20"
                            :filter="searchValue"
                            small
                            head-variant="light"
                            hover
                            sort-icon-left
                    >

                        <template v-slot:cell(name)="data">
                            <router-link :to="`/catalog/brands/edit/${data.item.id}`">{{ data.value }}</router-link>
                        </template>

                        <template v-slot:cell(contains_description)="data">
                            {{data.value ? 'есть' : 'нет'}}
                        </template>

                        <template v-slot:cell(cert.img)="data">
                            <b-img :src="data.value" width="50px"></b-img>
                        </template>

                    </table-static>


                </b-card-text>


            </b-card>


        </b-card-group>


    </b-container>


</template>

<script>
    // @ is an alias to /src
    import baseComponentsInputMixin from '@/mixins/base-components/inputs'

    import {mapGetters} from "vuex";

    export default {
        name: 'Home',
        mixins: [baseComponentsInputMixin],


        data() {
            return {
                spinerLoaderIsShow: true,
                fields: [
                    {key: 'selected', label: '', thStyle: {width: '50px'}},
                    {key: 'id', sortable: true,},
                    {key: 'name', sortable: true,},
                    {key: 'contains_description', label: 'Описание', sortable: true, thStyle: {width: '150px'}},
                    {key: 'description_id', label: 'id описания', thStyle: {width: '150px'}},
                    {key: 'cert.img', label: 'Сертификат', thStyle: {width: '150px'}},
                ],
                searchValue: null,
            }
        },

        methods: {},

        components: {},
        computed: {
            ...mapGetters({brandsList: "CatalogBrands/allItems"}, {valueSearchInput: "BaseComponents/getValueInputSearch"}),
        },

        async mounted() {
            await this.$store.dispatch("CatalogBrands/getDataAllItems");
            this.spinerLoaderIsShow = false
        }

    }

</script>

<style scoped>

    .btn {
        width: 85px;
    }

</style>
