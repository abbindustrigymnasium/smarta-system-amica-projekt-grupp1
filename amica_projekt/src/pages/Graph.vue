<template>
  <div class="bg-darkBackground window-height window-width row q-pa-md justify-center items-center">
    <div class="row">
      <line-chart class="bg-darkBackgroundLayer" :chart-data="datacollection">
      </line-chart>
    </div>
    <div class="row">
      <button @click="getData()">Randomize</button>
    </div>
  </div>
</template>

<script>
import LineChart from '../js/CHHart.js'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.datacollection = {
        // hämta data och lägg in de här
        datasets: [
          {
            label: '1',
            backgroundColor: '#ff4545',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: '2',
            backgroundColor: '#ffa534',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: '3',
            backgroundColor: '#ffe234',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: '4',
            backgroundColor: '#b7dd29',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: '5',
            backgroundColor: '#57e32c',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style>
  .bg-darkBackground {
    background-color: #121212;
  }
  .bg-darkBackgroundLayer{
     background-color: #1F1B24;
  }
</style>
