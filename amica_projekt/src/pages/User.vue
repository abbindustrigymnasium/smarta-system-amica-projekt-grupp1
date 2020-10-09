<template>
  <div class="bg-darkBackground">
    <div class="row">
      <div class="col"/>
      <div class="col-7 col-md-auto" style="text-align: center">
        <h2 class="text-deep-purple-4" style="height: 15vh">Vad åt du idag?</h2>
      </div>
      <div class="col"/>
    </div>
    <div class="row justify-around">
      <div class="col-6">
        <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" flat style="width: 100%; height: 35vh" size="24px" :label="mat1" @click=toggleDialog(1,mat1) />
        <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" flat style="width: 100%; height: 35vh" size="24px" label="Kötbullar" @click=toggleDialog(1,mat2) />
      </div>
      <div class="col-6">
        <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" flat style="width: 100%; height: 35vh" size="24px" label="Pizza" @click=toggleDialog(1,mat3) />
        <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" flat style="width: 100%; height: 35vh" size="24px" label="Soppa" @click=toggleDialog(1,mat4) />
      </div>
    </div>
    <div>
      <q-dialog v-model="dialog1" class="flex flex-center">
        <q-card class="col-12 col-xl-2 justify-center">
          <q-card-section class="row justify-center full-height full-width text-center">
            <h4>Betygsätt {{clicked}}</h4>
          </q-card-section>
              <div class="row justify-center full-height full-width text-center">
                <q-rating
                          v-model="ratingModel"
                          size="3.5em"
                          color="yellow"
                          icon="star_border"
                          icon-selected="star"
                          @click=toggleDialog(2)
                        />
          </div>
          <q-card-section class="row items-center">
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog flat v-model="dialog2">
        <div>
          <q-card>
            <div id="q-app" class="row">
              <div>
                <div>
                  <q-select
                    filled
                    v-model="model"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    :options="options"
                    @filter="filterFn"
                    style="width: 250px"
                    label = "Föreslå en maträtt"
                  >
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
          </q-card>
          <div class="row">
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>
        </div>
      </q-dialog>
    </div>
  </div>
</template>

<script>
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
export default {
  name: 'User',
  data () {
    return {
      dialog1: false,
      dialog2: false,
      mat1: 'spaghetti med köttfärsås',
      mat2: 'köttbullar',
      mat3: 'pizza',
      mat4: 'soppa',
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
</style>
