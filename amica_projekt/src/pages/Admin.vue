<template>
  <div class="bg-darkBackground window-height window-width row q-pa-md justify-center items-center">
    <div class="column">

      <div class="row">
        <div class="chart">
          <line-chart :chartdata="chartdata" :options="options"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import LineChart from '../js/render.js'

export default {
  name: 'Admin',
  components: {
    LineChart
  }
  // data () {
  //   return {
  //   }
  // }
}
</script>

<style>
  .bg-darkBackground {
    background-color: #121212;
  }
  .bg-primaryColor {
    color: #bb86fc;
  }
  .bg-secondaryColor{
    color: #03dac6;
  }
  .bg-colorthingy{
     background-color: #1F1B24;
  }
</style>
