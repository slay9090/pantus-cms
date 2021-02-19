<template>
  <b-container fluid>

    <b-card-group deck>


      <b-card title="География переходов" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Переходы за месяц</h6>
        </template>
        <b-card-text>

          <div class="w-100" v-if="!initFailed">
              <apexchart type="bar" height="250" :options="visitsGeography.chartOptions" :series="visitsGeography.series"></apexchart>
          </div>

        </b-card-text>


      </b-card>

      <b-card title="Доля источников переходов" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Уникальные посетители</h6>
        </template>
        <b-card-text>

          <div class="w-100" v-if="!initFailed">
            <apexchart type="pie" height="250" :options="sourcesUsers.chartOptions" :series="sourcesUsers.series"></apexchart>
          </div>

        </b-card-text>


      </b-card>

      <b-card title="Доля устройств" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Переходы за неделю</h6>
        </template>
        <b-card-text>

          <div class="w-100" v-if="!initFailed">
            <apexchart type="pie" height="250"  :options="diviceVisits.chartOptions" :series="diviceVisits.series"></apexchart>
          </div>

        </b-card-text>


      </b-card>


    </b-card-group>


    <b-card-group deck  class="mt-4" >


          <b-card title="График роста" header-tag="header" footer-tag="footer" class="shadow">
            <template #header>
              <h6 class="mb-0">Рост за год</h6>
            </template>
            <b-card-text class="">

              <div id="chart" class="w-100" v-if="!initFailed">
                <apexchart type="line" height="auto" :options="visitsAllMonth.chartOptions"
                           :series="visitsAllMonth.series"></apexchart>

              </div>

            </b-card-text>

          </b-card>

          <b-card title="Поисковые запросы за неделю" header-tag="header" footer-tag="footer" class="shadow ">
            <template #header>
              <h6 class="mb-0">Поиск</h6>
            </template>
            <b-card-text class="d-flex justify-content-center">


              <table-static

                  id="yandex-metric-sources-search-phrases"
                  :fields="fields"
                  :items="sourcesSearchPhrases ? sourcesSearchPhrases.data : []"
                  :is-load="initFailed"
                  :per-page="7"

              >

              </table-static>


            </b-card-text>

          </b-card>

    </b-card-group>

  </b-container>
</template>

<script>
import init from "./init";

export default {
  name: "index",
  mixins: [init,],

  data() {
    return {
      fields: [

        { key: 'dimensions[0].name', label: 'Поисковый запрос'  },
        { key: 'metrics[0]', sortable: true , label: 'Кол-во переходов'},

      ],



    }
  },

  computed: {
    sourcesSearchPhrases() {
      return this.$store.getters["StatisticYandex/items"]('sourcesSearchPhrases')
    },

    visitsAllMonth() {
      return {
        series: [{
          name: "Визиты",
          data: this.$store.getters["StatisticYandex/items"]('visitsAllMonth') ? this.$store.getters["StatisticYandex/items"]('visitsAllMonth').data[0].metrics[0] : []
        }],
        chartOptions: {
          chart: {
            // height: auto,
            type: 'line',
            zoom: {
              enabled: true,
              // type: 'x',
            }
          },

          // markers: {
          //   hover: {
          //     sizeOffset: 4
          //   }
          // },

          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight',
            // width: 1
          },

          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            type: 'datetime',
            tickAmount: 10,
            categories: this.$store.getters["StatisticYandex/items"]('visitsAllMonth') ?
                this.$store.getters["StatisticYandex/items"]('visitsAllMonth').time_intervals.map(elem => {
                  // const month = /-(.+)-(.+)/.exec(elem[0])[1];
                  // const day = /-(.+)-(.+)/.exec(elem[0])[2];
                  // return `${day}-${month}`
                  return elem[0]
                })
                : [],
            // labels: {
            //   rotate: -45,
            //
            // },
            // tickPlacement: 'on',

            // labels: {
            //   formatter: function(value, timestamp, opts) {
            //     return opts.dateFormatter(new Date(timestamp), 'MMM')
            //   }
            // }

          },
          // yaxis: {
          //   opposite: false
          // },

          // legend: {
          //   horizontalAlign: 'left'
          // }
        }
      }



    },

    sourcesUsers(){
      return {
        series: this.$store.getters["StatisticYandex/items"]('sourcesUsers').data.map( elem => {
        return   elem.metrics[0]
        }),
        chartOptions: {
          chart: {
            // width: '70%',
            type: 'pie',
          },
          legend: {
            width: 150,
            // position: 'bottom'

          },
          labels: this.$store.getters["StatisticYandex/items"]('sourcesUsers').data.map( elem => {
            return   elem.dimensions[0].name
          }),
          responsive: [{
            breakpoint: 1600,
            options: {
              chart: {
                // width: 200
              },
              legend: {
                show: false
              }
            }
          }]
        }
      }
    },

    diviceVisits(){
      return {
        series: Object.values(this.$store.getters["StatisticYandex/items"]('visitsDevice').totals).flat(Infinity) ,
        chartOptions: {
          chart: {
            // width: '70%',
            type: 'pie',
          },
          legend: {
            width: 150,
            // position: 'bottom'
          },
          labels: ['Мобильные', 'ПК'],
          responsive: [{
            breakpoint: 1600,
            options: {
              chart: {
                // width: 200
              },
              legend: {
                show: false
              }
            }
          }]
        }
      }
    },

    visitsGeography(){
      const totalCount = this.$store.getters["StatisticYandex/items"]('visitsGeography').totals
      return {
        series: [{
          name: '',

          data: this.$store.getters["StatisticYandex/items"]('visitsGeography').data.map(elem => {
            const precent = elem.metrics[0]/(totalCount/100)
            return precent.toFixed(2)
          }).flat(Infinity)
        }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'bar',

          },
          legend: {
            show: false
          },
          markers: {
            size: 0
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },

          xaxis: {
            categories: this.$store.getters["StatisticYandex/items"]('visitsGeography').data.map(elem => {
              return elem.dimensions[0].name
            }),
            labels: {
              show: false,
              rotate: -90
            },

            position: 'botton',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: true
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: false,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,

              formatter: function (val) {
                return val + "%";
              }
            }

          },

        },
      }
    }

  },

 mounted() {
    this.dataInit();
  }
}
</script>

<style scoped>

</style>