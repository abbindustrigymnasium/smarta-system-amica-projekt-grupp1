<template>
  <div>
    <div class="bg-darkBackground window-height window-width justify-center items-center">
      <div class="column" style="height: 20%">
        <div class="col-8" style="text-align: center">
          <h2 class="text-deep-purple-4">Vad åt du idag?</h2>
        </div>
      </div>
      <div class="column" style="height: 80%">
        <div class="col-6">
          <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" style="width: 50%; height: 100%" size="24px" :label="mat1" @click=toggleDialog(1,mat1) />
          <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" style="width: 50%; height: 100%" size="24px" :label="mat2" @click=toggleDialog(1,mat2) />
        </div>
        <div class="col-6">
          <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" style="width: 50%;  height: 100%" size="24px" :label="mat3" @click=toggleDialog(1,mat3) />
          <q-btn class="bg-darkBackgroundLayer" text-color="teal-14" style="width: 50%;  height: 100%" size="24px" :label="mat4" @click=toggleDialog(1,mat4) />
        </div>
      </div>
    </div>
    <div>
      <q-dialog v-model="dialog1">
          <q-card style="width: 100%; height: 50%" class="bg-darkBackgroundLayer">
            <q-card-section class="text-center items-center">
              <h4 class="text-deep-purple-4">Betygsätt {{clicked}}</h4>
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
          <q-btn size="lg" class="bg-deep-purple-4 absolute-bottom" label="Submit" type="submit" color="primary" style="margin:auto; width:50%"/>
         </q-card>
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
