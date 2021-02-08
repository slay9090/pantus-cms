<template>
  <b-container fluid>

    <b-card-group deck>
      <b-card title="Нагрузка на сервер" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">ЦП</h6>
        </template>
        <b-card-text class="d-flex justify-content-center">
<!--          <div class="d-flex justify-content-center mt-4">-->
<!--            <div class="block-diagram-circle">-->
<!--              <div class="block-diagram-circle__draw">-->
<!--                <span class="block-diagram-circle__text">15%</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

          <apexchart type="donut" :options="performanceSys.chartOptions" :series="performanceSys.series" :labels="performanceSys.labels" class="w-100"></apexchart>

        </b-card-text>

      </b-card>

      <b-card title="Title" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Header Slot</h6>
        </template>
        <b-card-text>

            <apexchart type="bar" :options="ordersMonth.options" :series="ordersMonth.series" class="w-100"></apexchart>

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


    <b-card-group deck class="my-4">
      <b-card title="Title" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Header Slot</h6>
        </template>
        <b-card-text>Header and footers using slots.

          <b-table
              id="table-transition-example"
              :items="items"
              :fields="fields"
              striped
              hover
              outlined
              small
              primary-key="a"
              :tbody-transition-props="transProps"
          ></b-table>

        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>

      </b-card>
    </b-card-group>




  </b-container>
</template>





<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  data() {
    return {
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      items: [
        { a: 2, b: 'Two', c: 'Moose' },
        { a: 1, b: 'Three', c: 'Dog' },
        { a: 3, b: 'Four', c: 'Cat' },
        { a: 4, b: 'One', c: 'Mouse' }
      ],
      fields: [
        { key: 'a', sortable: true },
        { key: 'b', sortable: true },
        { key: 'c', sortable: true }
      ],
      ordersMonth: {
        options: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
      },


      performanceSys:{
        series: [75, 25],

        chartOptions: {
          labels: ["Свободно", "Занято"],
          colors: ['#99CC66', '#E74C3C'],

          // chart: {
          //   type: 'category',
          // },
          // responsive: [{
          //   breakpoint: 480,
          //   options: {
          //     chart: {
          //       width: 500,
          //     },
          //     legend: {
          //       position: 'bottom'
          //     }
          //   }
          // }]
        },
      },
    }


    }

}
</script>


<style scoped>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

.block-diagram-circle {
  height: 200px;
  width: 200px;
  overflow: hidden;
}

.block-diagram-circle__draw {
  width: 100%;
  height: 100%;
  font-size: 38px;
  line-height: 100px;
  text-align: center;
  background: #ECF5E4;
  border: 25px solid #95CD8B;
  border-right: 25px solid #D0E6BB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.block-diagram-circle__text {
  font-size: 1.5em;
  border: 1px solid #777777;
  display: contents;
}





</style>