<template>
  <div class="bg-darkBackground window-height window-width q-pa-lg justify-center items-center">
    <div class="bg-darkBackgroundLayer q-gutter-md row">
      <div>
        <line-chart styles="width: 0.39*window-width px" class="bg-darkBackgroundLayer2" :chart-data="dataGraph"></line-chart>
      </div>
      <div id="legend" class="bg-darkBackgroundLayer q-pl-xl">
      <h5 class="q-mb-sm">Dagens rätter: </h5>
        <!-- <h5>Maträtt 1: </h5><h5 v-html="decoder(this.datacollection[0].foodName)"/>
        <h5>Maträtt 2: </h5><h5 v-html="decoder(this.datacollection[1].foodName)"/>
        <h5>Maträtt 3: </h5><h5 v-html="decoder(this.datacollection[2].foodName)"/>
        <h5>Maträtt 4: </h5><h5 v-html="decoder(this.datacollection[3].foodName)"/> -->
        <h7>Maträtt 1: </h7><h7 v-html="decoder(this.datacollection[0].foodName)"/>
        <h7>Maträtt 2: </h7><h7 v-html="decoder(this.datacollection[1].foodName)"/>
        <h7>Maträtt 3: </h7><h7 v-html="decoder(this.datacollection[2].foodName)"/>
        <h7>Maträtt 4: </h7><h7 v-html="decoder(this.datacollection[3].foodName)"/>
      </div>
    </div>
    <div class="bg-darkBackground q-gutter-x-md">
      <q-btn style="width: 200px; height: 64px; font-size: 20px" class="q-mt-xl bg-darkBackgroundLayer" text-color="teal-14" unelevated label="Admin Log Out" no-caps @click="logoutUserAdmin()"/>
      <q-btn style="width: 200px; height: 64px; font-size: 20px" class="q-mt-xl bg-darkBackgroundLayer" text-color="teal-14" unelevated label="Go Home" no-caps @click="home"/>
    </div>
  </div>
</template>

<script>

import LineChart from '../js/CHHart.js'
import { db } from '../boot/firebase.js'
import 'firebase/firestore'
import { mapActions } from 'vuex'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: [],
      date: null,
      dataGraph: null
    }
  },
  mounted () {
    this.date = this.getDate()
  },
  watch: {
    date: {
      immediate: true,
      handler (date) {
        this.$bind('datacollection', db.collection('Dagens_Maträtter').doc('Amica').collection(date)).then(u => {
          this.getData()
        })
      }
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logoutUserAdmin () {
      this.logoutUser().then(u => {
        this.$router.push('/Admin')
      })
    },
    home: function () {
      this.$router.push({ path: '/' })
    },
    getDate () {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()
      return yyyy + '-' + mm + '-' + dd
    },
    getData () {
      const label = ['Maträtt 1', 'Maträtt 2', 'Maträtt 3', 'Maträtt 4']
      const star = [[], [], [], [], []]
      for (const index in this.datacollection) {
        console.log(index)
        // label.push(this.datacollection[index].foodName)
        star[0].push(this.datacollection[index].oneStar)
        star[1].push(this.datacollection[index].twoStar)
        star[2].push(this.datacollection[index].threeStar)
        star[3].push(this.datacollection[index].fourStar)
        star[4].push(this.datacollection[index].fiveStar)
      }
      console.log(this.datacollection)
      this.dataGraph = {
        labels: label,
        datasets: [
          {
            label: '1',
            backgroundColor: '#ff4545',
            data: star[0]
          }, {
            label: '2',
            backgroundColor: '#ffa534',
            data: star[1]
          }, {
            label: '3',
            backgroundColor: '#ffe234',
            data: star[2]
          }, {
            label: '4',
            backgroundColor: '#b7dd29',
            data: star[3]
          }, {
            label: '5',
            backgroundColor: '#57e32c',
            data: star[4]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    decoder (str) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = str
      return textArea.value
    }
  }
}

</script>

<style>
  #legend {
    color: #FFFFFF
  }
  .bg-darkBackground {
    background-color: #121212;
  }
  .bg-darkBackgroundLayer{
     background-color: #1F1B24;
  }
  .bg-darkBackgroundLayer2 {
    background-color: #302A38
  }

</style>
