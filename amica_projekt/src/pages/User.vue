<template>
  <div style="overflow: hidden" class="bg-darkBackground window-height column">
    <div v-if="$q.screen.lt.md" class="q-mt-none row justify-center">
      <q-btn class="bg-darkBackgroundLayer" style="font-weight: 300; visibility: hidden" text-color="negative" unelevated label="Admin Login" no-caps @click="routeAdmin"/>
    </div>
    <div class="row col-2 text-center justify-center">
      <q-btn v-if="$q.screen.gt.sm" class="q-mt-lg bg-darkBackgroundLayer" style="right: 30px; top: 0px; position: absolute; color: #7DD4C2" unelevated label="Admin Login" no-caps @click="routeAdmin"/>
      <h2 v-if="$q.screen.gt.sm" class="q-ma-none text-center q-py-xl justify-center">Vad åt du idag?</h2>
      <h3 v-else class="q-ma-none text-center q-py-sm justify-center" style="font-weight: 300" >Vad åt du idag?</h3>
    </div>
    <div class="row col-5 q-pb-lg q-gutter-sm justify-center">
      <q-btn no-caps v-for="(food, index) in foodList" :key="index" class="col-6 bg-darkBackgroundLayer" style="width: 46%; height: 100%" v-html="decoder(food.foodName)" @click=toggleDialog(1,food.foodName,food.id) />
    </div>
    <q-dialog v-model="dialog1">
      <q-card shadow-4 square style="width: 100%; height: flex;" class="bg-darkBackground">
        <q-card-section class="text-center items-center">
          <h4 style="color: #8C4C59; font-weight: 300" v-if="hasVoted || wrongInput">Betygsätt:</h4>
          <h4 style="color: #C4808D; font-weight: 300" v-else>Betygsätt:</h4>
          <h5 style="color: #8C4C59; font-weight: 300" v-if="hasVoted || wrongInput" v-html="decoder(clicked)"></h5>
          <h5 style="color: #7DD4C2; font-weight: 300" v-else v-html="decoder(clicked)"></h5>

          <div class="col">
            <q-rating v-if="hasVoted || wrongInput" v-model="ratingModel" size="3.5em" style="color: #8C4C59" icon="star_border" icon-selected="star" disabled @click=toggleDialog(2) />
            <q-rating v-else v-model="ratingModel" size="3.5em" style="color: #8C4C59" icon="star_border" icon-selected="star" @click=toggleDialog(2) />
          </div>

          <div class="col q-mt-md">
            <q-btn no-caps flat v-if="hasVoted || wrongInput" size="lg" class="col absolute-bottom bg-darkBackgroundLayer2" label="Bekräfta" type="submit" style="margin:auto; width:50%; color: #8C4C59; font-weight: 300" disabled @click="clickUpdate()"/>
            <q-btn no-caps flat v-else size="lg" class="col absolute-bottom bg-darkBackgroundLayer2" label="Bekräfta" type="submit" style="margin:auto; width:50%; color: #7DD4C2; font-weight: 300" @click="clickUpdate()"/>
          </div>

          <q-card-section v-if="!wrongInput && hasVoted" class="text-center q-pa-none q-pt-md" style="border-radius: 5px;">
            <p style="color: #8C4C59;">Du har tyvärr redan betygsatt<br>Du kan betygsätta imorgon igen</p>
          </q-card-section>
          <q-card-section v-else-if="wrongInput" class="text-center q-pa-none q-pt-md" style="border-radius: 5px;">
            <p style="color: #8C4C59;">Du kan tyvärr inte betygsätta 0 stjärnor<br>Testa att trycka på stjärnorna</p>
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { parseXml, xml2json } from '../xml_to_json'
import { db, increment } from '../boot/firebase'
export default {
  name: 'User',
  data () {
    return {
      date: null,
      dialog1: false,
      foodList: {
        foodA: { foodName: ''},
        foodB: { foodName: ''},
        foodC: { foodName: ''},
        foodD: { foodName: ''}
      },
      clicked: '',
      ratingModel: 0,
      ratingVal: 0,
      currentFoodHover: null,
      hasVoted: false,
      wrongInput: false
    }
  },
  methods: {
    routeAdmin: function () {
      this.$router.push({ path: '/Admin' })
    },
    toggleDialog: function (state, mat, foodname) {
      if (state === 1) {
        this.hasVoted = false
        this.wrongInput = false
        this.currentFoodHover = foodname
        console.log(mat)
        this.ratingModel = 0
        this.dialog1 = !this.dialog1
        this.clicked = mat
      }
      if (state === 2) {
        this.wrongInput = false
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
            const nameForIndexing = ['foodA', 'foodB', 'foodC', 'foodD']
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
      if (window.localStorage.getItem('date') !== this.date) {
        var star = this.ratingVal
        console.log(star)
        let update
        switch(star) {
          case 0:
            this.wrongInput = true
            break
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
        if (!this.wrongInput){
          console.log(this.currentFoodHover)
          db.collection('Dagens_Maträtter').doc('Amica').collection(this.getDate()).doc(this.currentFoodHover).update(update)
          this.dialog1 = !this.dialog1
          localStorage.date = this.date;
          window.localStorage.setItem("date", this.date.text());
        }
      } else {
        this.wrongInput = false
        this.hasVoted = true
      }
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
  h2, h3 {
    color: #C4808D
  }
  .bg-darkBackground {
    background-color: #121716;
  }
  .bg-darkBackgroundLayer {
     background-color: #292224;
  }
  .q-btn {
    position: relative;
    border-radius: 0px;
    word-wrap: break-word;
  }
  .q-btn p {
    color: #7DD4C2;
    font-size: 1.8em;
    font-weight: 300;
    margin: auto;
    text-align: center;
    line-height: 100%;
    width: 85%;
  }
  .bg-darkBackgroundLayer2 {
    background-color: #292224
  }
</style>