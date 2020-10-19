import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          minRotation: 45,
          maxRotation: 45
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
