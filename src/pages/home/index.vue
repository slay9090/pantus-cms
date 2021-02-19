<template>
  <b-container fluid>
  <b-overlay :show="initFailed">
    <b-card-group deck v-if="!initFailed">

      <b-card title="Нагрузка на сервер" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">ЦП</h6>
        </template>
        <b-card-text class="">

        <div class="chart-pie d-flex justify-content-center">
          <apexchart type="donut" height="250" :options="performanceSys.chartOptions" :series="performanceSys.series" :labels="performanceSys.labels" class="w-100"></apexchart>
        </div>

        </b-card-text>

      </b-card>

      <b-card title="Нагрузка на сайт" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Нагрузка за неделю</h6>
        </template>
        <b-card-text>

          <div >
            <apexchart type="area" height="250" :options="performance.chartOptions" :series="performance.series"></apexchart>
          </div>

        </b-card-text>


      </b-card>

      <b-card title="Title" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Header Slot</h6>
        </template>
        <b-card-text>Header and footers using slots.</b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>

      </b-card>
    </b-card-group>


    <b-card-group deck class="my-4" >
      <b-card title="Популярные страницы" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Популярное за неделю</h6>
        </template>
        <b-card-text>
          <table-static
              id="home-popular-pages-chart"
              :items="popularPages? popularPages.data : []"
              :fields="fields"
              small
              striped
              hover
          >
            <template v-slot:cell(dimensions[1].name)="data">
              <a :href="'https://pantus.ru'+data.value" class="mb-0 title-block__text-limit" target="_blank">
                {{ 'https://pantus.ru'+data.value }}
              </a>
            </template>
          </table-static>


        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>

      </b-card>
    </b-card-group>







  </b-overlay>
  </b-container>
</template>





<script>
import VueApexCharts from 'vue-apexcharts'
//https://api-metrika.yandex.net/stat/v1/data?metrics=ym:pv:pageviewsPerMinute&group=day&dimensions=ym:pv:date&sort=ym:pv:date сделать по нагрузке
//https://api-metrika.yandex.net/stat/v1/data?metrics=ym:pv:users&dimensions=ym:pv:title,ym:pv:URLPathFull самые популярные страницы

import init from "./init"

export default {
  mixins: [init],
  data() {
    return {
      transProps: {
        // Transition name
        name: 'flip-list'
      },


      fields: [
        { key: 'dimensions[0].name', label: 'Заголовок страницы', sortable: true,  thStyle: {  width: '50%' }, class:"d-md-table-cell d-none"},
        { key: 'dimensions[1].name', label: 'Путь', sortable: true, },
        { key: 'metrics[0]', label: 'Посетителей', sortable: true, thStyle: {  width: '10%' }, class:"d-sm-table-cell d-none" },
      ],


      performanceSys:{
        series: [75, 25],

        chartOptions: {
          labels: ["Свободно", "Занято"],
          legend: {
            show: false
          },
          colors: ['#99CC66', '#E74C3C'],
          responsive: [{
            breakpoint: 1350,
            options: {
              chart: {
                // width: 200
              },
              legend: {
                show: false
              }
            }
          }]

        },
      },
    }


    },




  computed: {

    performance(){
      return {
        // this.$store.getters["StatisticYandex/items"]('sourcesUsers').data

        series: [{
          name: "Просмотров страниц/мин",
          data: this.$store.getters["StatisticYandex/items"]('performanceWeek').data.map(elem => {
            return elem.metrics[0].toFixed(2)
          })
        }],
        chartOptions: {
          chart: {
            type: 'area',
            height: 350,
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },

          // title: {
          //   text: 'Fundamental Analysis of Stocks',
          //   align: 'left'
          // },
          // subtitle: {
          //   text: 'Price Movements',
          //   align: 'left'
          // },
          labels: this.$store.getters["StatisticYandex/items"]('performanceWeek').data.map(elem => {
            return elem.dimensions[0].name
          }),
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            opposite: true
          },
          legend: {
            horizontalAlign: 'left'
          }
        },


      }


    },

    popularPages(){
      console.log('cange popularPages')
      return this.$store.getters["StatisticYandex/items"]('popularPages');

    }

  },

  mounted() {
    this.dataInit();
  }

}
</script>


<style scoped>
.title-block__text-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
  line-break: anywhere;
}

.chart-pie {
  min-width: 250px;

}
</style>