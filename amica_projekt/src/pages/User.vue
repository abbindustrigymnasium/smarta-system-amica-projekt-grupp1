<template>
  <div class="bg-darkBackground window-height column">
      <h2 class="text-deep-purple-4 q-ma-none text-center q-py-xl col-2">Vad åt du idag?</h2>
      <div class="row col-5">
        <q-btn v-for="(food, index) in foodList" :key="index" class="col-6 bg-darkBackgroundLayer" text-color="teal-14" style="width: 50%; height: 100%; " size="24px" v-html="decoder(food.foodName)" @click=toggleDialog(1,food.foodName) />
        <!-- lägg till food.foodName i classen/indexen så vi kan peka mot de i clickUpdate (använd queryselector?) -->
      </div>
      <q-dialog v-model="dialog1">
          <q-card style="width: 100%; height: flex" class="bg-darkBackgroundLayer">
            <q-card-section class="text-center items-center">
              <h4 class="text-deep-purple-4">Betygsätt:</h4>
              <h5 class="text-deep-purple-4" v-html="decoder(clicked)"></h5>
              <q-rating v-model="ratingModel" size="3.5em" color="teal-14" icon="star_border" icon-selected="star" @click=toggleDialog(2) />
              <q-btn size="lg" class="bg-deep-purple-4 absolute-bottom" label="Submit" type="submit" color="primary" style="margin:auto; width:50%" @click=clickUpdate() />
            </q-card-section>
          </q-card>
      </q-dialog>
      <!-- <q-dialog flat v-model="dialog2">
        <q-card style="width: 100%; height: 50%" class="bg-darkBackgroundLayer">
          <div class="justify-center items-center">
            <div>
              <div>
                <q-select filled v-model="model" use-input hide-selected fill-input input-debounce="0" :options="options" @filter="filterFn" label="Föreslå en maträtt" color="teal-14" label-color="teal-14" dark outlined>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </div>
          <q-btn size="lg" class="bg-deep-purple-4 absolute-bottom" label="Submit" type="submit" color="primary" style="margin:auto; width:50%" @click=clickUpdate() />
         </q-card>
      </q-dialog> -->
    </div>
</template>

<script>
import { parseXml, xml2json } from '../xml_to_json'
import { db, increment } from '../boot/firebase'
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
export default {
  name: 'User',
  data () {
    return {
      date: null,
      dialog1: false,
      dialog2: false,
      foodList: {
        foodOne: { foodName: ''},
        foodTwo: { foodName: ''},
        foodThree: { foodName: ''},
        foodFour: { foodName: ''}
      },
      clicked: '',
      options: stringOptions,
      ratingModel: 0,
      ratingVal: 0, // Stjärnans värde
      model: '',
      modelVal: '' // Önskade maträttens värde
    }
  },
  methods: {
    toggleDialog: function (state, mat) {
      if (state === 1) {
        console.log(mat)
        this.ratingModel = 0
        this.dialog1 = !this.dialog1
        this.clicked = mat
      }
      if (state === 2) {
        this.ratingVal = this.ratingModel
      }
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    getFood () {
      fetch('https://cors-anywhere.herokuapp.com/' + 'https://foodandco.se/modules/MenuRss/MenuRss/CurrentWeek?costNumber=6417&language=sv')
        .then(result => {
          result.text().then(response => {
            var today = new Date()
            const myDom = parseXml(response)
            const myJson = xml2json(myDom)
            const mySplitArray = myJson.split('undefined')
            const myNewJson = JSON.parse(mySplitArray[0] + mySplitArray[1])
            var tempmenu = myNewJson.rss.channel.item
            var weekmenu = []
            for (var i = 0; i < Object.keys(tempmenu).length; i++) {
              if (tempmenu[i].description != null) {
                weekmenu.push(tempmenu[i].description.split(/(?=&lt;p&gt;)/g))
              } else {
                weekmenu.push([])
              } 
            }

            var docDirectory = db.collection("Dagens_Maträtter").doc("Amica")
            const nameForIndexing = ['foodOne', 'foodTwo', 'foodThree', 'foodFour']
            for (let j=0; j<4; j++) {
              docDirectory.collection(this.getDate()).doc(nameForIndexing[j]).set({
                oneStar: 0,
                twoStar: 0,
                threeStar: 0,
                fourStar: 0,
                fiveStar: 0,
                foodName: weekmenu[today.getDay() - 1][j]
              })
            }
          })
        })
    },
    decoder (str) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = str
      return textArea.value
    },
    clickUpdate () {
      var star = this.ratingVal
      console.log(star)
      let update
      switch(star) {
        case 1:
          update = {'oneStar': increment}
          break
        case 2: 
          update = {'twoStar': increment}
          break
        case 3:
          update = {'threeStar': increment}
          break
        case 4: 
          update = {'fourStar': increment}
          break
        case 5: 
          update = {'fiveStar': increment}
          break
      }

      var selectedFood = this.decoder(this.clicked)
      console.log(selectedFood)
      db.collection('Dagens_Maträtter').doc('Amica').collection(this.getDate()).doc(selectedFood).update(update)
      this.dialog2 = !this.dialog2
    },
    getDate () {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()
      return yyyy + '-' + mm + '-' + dd
    },
    getTodaysFood () {
      var docDirectory = db.collection("Dagens_Maträtter").doc("Amica")

      docDirectory.collection(this.getDate()).limit(1).get()
        .then(query => {
          if (query.size === 0) {
            this.getFood()
          }
          this.date = this.getDate()
        })
    }
  },
  mounted () {
    this.getTodaysFood()
  },
  watch: {
    date: {
      immediate: true,
      handler (date) {
        if(date != null) {
        this.$bind('foodList', db.collection('Dagens_Maträtter').doc('Amica').collection(date)).then(u => {
          console.log(this.foodList)
        })
      }
      }
    }
  }
}
</script>

<style>
  .bg-darkBackground {
    background-color: #121212;
  }
  .bg-darkBackgroundLayer {
     background-color: #1F1B24;
  }
  .q-btn {
    position: relative;
  }
  .q-btn p {
    position: absolute;
    top: 43%;
    width: 100%;
  }
</style>