<template>
  <div>
    <div class="bg-darkBackground window-height window-width justify-center items-center">
      <div class="column" style="height: 20%">
        <div class="col-8" style="text-align: center">
          <h2 class="text-deep-purple-4">Vad åt du idag?</h2>
        </div>
      </div>
      <div class="column" style="height: 80% ">
        <div class="col-6">
          <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" style="width: 50%; height: 100%" size="24px" v-html="decoder(mat1)" @click=toggleDialog(1,mat1) />
          <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" style="width: 50%; height: 100%" size="24px" v-html="decoder(mat2)" @click=toggleDialog(1,mat2) />
        </div>
        <div class="col-6">
          <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" style="width: 50%;  height: 100%" size="24px" v-html="decoder(mat3)" @click=toggleDialog(1,mat3) />
          <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" style="width: 50%;  height: 100%" size="24px" v-html="decoder(mat4)" @click=toggleDialog(1,mat4) />
        </div>
      </div>
    </div>
    <div>
      <q-dialog v-model="dialog1">
          <q-card style="width: 100%; height: flex" class="bg-darkBackgroundLayer">
            <q-card-section class="text-center items-center">
              <h3 class="text-deep-purple-4">Hur smakade</h3>
              <h4 class="text-deep-purple-4" v-html="decoder(clicked)"></h4>
              <q-rating v-model="ratingModel" size="3.5em" color="teal-14" icon="star_border" icon-selected="star" @click=toggleDialog(2) />
            </q-card-section>
          </q-card>
      </q-dialog>
      <q-dialog flat v-model="dialog2">
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
      </q-dialog>
    </div>
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
      dialog1: false,
      dialog2: false,
      mat1: '',
      mat2: '',
      mat3: '',
      mat4: '',
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
        this.ratingModel = 0
        this.model = ''
        this.dialog1 = !this.dialog1
        this.clicked = mat
      }
      if (state === 2) {
        this.dialog1 = !this.dialog1
        this.dialog2 = !this.dialog2
        this.modelVal = this.model
        this.ratingVal = this.ratingModel
        console.log(this.modelVal)
        console.log(this.ratingVal)
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
            this.mat1 = weekmenu[today.getDay() - 1][0]
            this.mat2 = weekmenu[today.getDay() - 1][1]
            this.mat3 = weekmenu[today.getDay() - 1][2]
            this.mat4 = weekmenu[today.getDay() - 1][3]
          })
        })
    },
    decoder (str) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = str
      return textArea.value
    },
    clickUpdate () {
      console.log("hej")
      var star = this.ratingVal
      console.log(star)
      let update
      switch(star) {
        case 1 :
          update = {'one': increment}
          break
        case 2: 
          update = {'two': increment}
          break
        case 3 :
          update = {'three': increment}
          break
        case 4: 
          update = {'four': increment}
          break
        case 5: 
          update = {'five': increment}
          break
      }

      var selectedFood = this.decoder(this.clicked)
        .replace('<p>', '')
        .replace('</p>', '')
      console.log("kjh")
      db.collection('Dagens_Maträtter').doc('Amica').collection('2020-10-13').doc('Kycklingbullar serveras med het tomatsås, rostad potatis och picklade grönsaker med vit balsamvinäger').update(update)
      this.dialog2 = !this.dialog2
    },
    getDate () {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()
      return yyyy + '-' + mm + '-' + dd
    }
  },
  mounted () {
    this.getFood()
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
    top: 50%;
    width: 100%;
  }
</style>
