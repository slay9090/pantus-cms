<template>
  <div>
    <b-card-group deck>
      <b-card title="Title" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Header Slot</h6>
        </template>
        <b-card-text class="d-flex justify-content-left">
          Header and footers using slots.
        </b-card-text>
        <div class="d-flex justify-content-center mb-3">
                <div class="block-diagram-circle">
                  <div class="block-diagram-circle__draw">
                    <span class="block-diagram-circle__text">15%</span>
                  </div>
                </div>
        </div>

        <b-button href="#" variant="primary">Go somewhere</b-button>

      </b-card>

      <b-card title="Title" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
          <h6 class="mb-0">Header Slot</h6>
        </template>
        <b-card-text>
          Header and footers using slots.
          <dl>
            <dt>
              Browser market share June 2015
            </dt>
            <dd class="percentage percentage-11"><span class="text">IE 11: 11.33%</span></dd>
            <dd class="percentage percentage-49"><span class="text">Chrome: 49.77%</span></dd>
            <dd class="percentage percentage-16"><span class="text">Firefox: 16.09%</span></dd>
            <dd class="percentage percentage-5"><span class="text">Safari: 5.41%</span></dd>
            <dd class="percentage percentage-2"><span class="text">Opera: 1.62%</span></dd>
            <dd class="percentage percentage-2"><span class="text">Android 4.4: 2%</span></dd>
          </dl>
        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>

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




  </div>
</template>

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

<script>
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
      ]
    }
  }
}
</script>
