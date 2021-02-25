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
                                            v-model="searchValueBrands"
                                            placeholder="Поиск"
                                            class="my-auto"
                                    />
                                </b-col>
                                <b-col>
                                    <b-button class="" :disabled="!searchValueBrands" @click="searchValueBrands=null">Clear
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-col>


                        <b-col>

                            <div class="d-flex justify-content-sm-end justify-content-between mb-3">
                                <b-button variant="outline-danger" disabled class="mr-3 ">Удалить</b-button>
                                <b-button variant="outline-success" disabled class="">Создать</b-button>
                            </div>

                        </b-col>

                    </b-row>


                    <table-static
                            id="catalog-brands-list"
                            :fields="fields.brands"
                            :items="brandsList"
                            :is-load="spinerLoaderIsShow"
                            responsive="sm"
                            :per-page="20"
                            :filter="searchValueBrands"
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

            <b-card title="Описания брендов" header-tag="header" footer-tag="footer" class="shadow ">
                <template #header>
                    <!--          <h6> <small class="text-muted">Бренды</small></h6>-->
                    <h6 class="mb-0">Описания</h6>
                </template>
                <b-card-text>

                    <b-row align-h="between" cols="1" cols-sm="2">

                        <b-col class="mb-3">
                            <b-row cols="1" cols-sm="2">
                                <b-col>
                                    <BTextInput
                                            v-model="searchValueDescriptions"
                                            placeholder="Поиск"
                                            class="my-auto"
                                    />
                                </b-col>
                                <b-col>
                                    <b-button class="" :disabled="!searchValueDescriptions" @click="searchValueDescriptions=null">Clear
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
                            id="catalog-brands-list11"
                            :fields="fields.descriptions"
                            :items="descriptionsList"
                            :is-load="spinerLoaderIsShow"
                            responsive="sm"
                            :per-page="5"
                            :filter="searchValueDescriptions"
                            small
                            head-variant="light"
                            hover
                            sort-icon-left
                    >

                        <template v-slot:cell(description)="data">

                            <span
                                    v-html="data.value.substr(0, 250).replaceAll('h1', 'h6')+'...'"
                                    class="text-table_cell-descriptions"
                            ></span>
                            <router-link :to="`/catalog/brands/descriptions/edit/${data.item.id}`" class="text-table_cell-descriptions">редактировать</router-link>
                        </template>


                    </table-static>


                </b-card-text>


            </b-card>

        </b-card-group>


    </b-container>


</template>

<script>
    // @ is an alias to /src


    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapActions} = createNamespacedHelpers('CatalogBrands')



    export default {
        name: 'Home',
        // mixins: [baseComponentsInputMixin],

        components: {},

        data() {
            return {
                spinerLoaderIsShow: true,

                fields: {
                    brands : [
                        {key: 'selected', label: '', thStyle: {width: '50px'}},
                        {key: 'id', sortable: true,},
                        {key: 'name', sortable: true,},
                        {key: 'contains_description', label: 'Описание', sortable: true, thStyle: {width: '150px'}},
                        {key: 'description_id', label: 'id описания', thStyle: {width: '150px'}},
                        {key: 'cert.img', label: 'Сертификат', thStyle: {width: '150px'}},
                    ],
                    descriptions: [
                        {key: 'selected', label: '', thStyle: {width: '50px'}},
                        {key: 'id', sortable: true, thStyle: {width: '50px'}},
                        {key: 'description', label: 'Текст', thStyle: {width: '250px'}},
                        {key: 'code', sortable: true, thStyle: {width: '50px'}},
                        {key: 'aliases', label: 'Бренды ИД', thStyle: {width: '100px'}, class: 'text-break'},

                    ]
                },
                searchValueBrands: null,
                searchValueDescriptions: null,
            }
        },

        methods: {
            ...mapActions(
                {
                    getApiBrandsList: "getDataAllItems",
                    getApiDescriptionsList: "getDescriptionsItemsList"
                })
        },


        computed: {
            ...mapGetters(
                {
                    brandsList: "allItems",
                    descriptionsList: "descriptionsItemsList",
                }),
        },

        async mounted() {

            await this.getApiBrandsList();
            await this.getApiDescriptionsList();

            this.spinerLoaderIsShow = false
        }

    }

</script>

<style scoped>
    .btn {
        width: 85px;
    }
    .text-table_cell-descriptions{
        font-size: 12px;
    }

</style>
