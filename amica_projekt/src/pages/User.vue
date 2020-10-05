<template>
  <div>
    <div class="row">
      <div class="col" />
      <div class="col-7 col-md-auto" style="text-align: center">
        <h2 style="height: 15vh">Vad åt du idag?</h2>
      </div>
      <div class="col" />
    </div>
    <div class="row">
      <div class="col-6">
        <q-btn flat style="color: #000000; width: 100%; height: 35vh" size="24px" :label="mat1" @click=saveFood(mat1) />
        <q-btn flat style="color: #000000; width: 100%; height: 35vh" size="24px" label="Kötbullar" @click=saveFood(mat2) />
      </div>
      <div class="col-6">
        <q-btn flat style="color: #000000; width: 100%; height: 35vh" size="24px" label="Pizza" @click=saveFood(mat3) />
        <q-btn flat style="color: #000000; width: 100%; height: 35vh" size="24px" label="Soppa" @click=saveFood(mat4) />
      </div>
    </div>
    <div>
      <q-dialog v-model="dialog" class="flex flex-center">
        <q-card>
          <q-card-section class="row items-center">
            <h4>Rate {{clicked}}</h4>
          </q-card-section>
              <div class="q-pa-md">
                <q-rating
                          v-model="ratingModel"
                          size="3.5em"
                          color="green-5"
                          icon="star_border"
                          icon-selected="star"
                        />
          </div>
          <q-card-section class="row items-center">
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      dialog: false,
      mat1: 'Spaghetti med köttfärsås',
      mat2: 'Köttbullar',
      mat3: 'Pizza',
      mat4: 'Soppa',
      clicked: ''
    }
  },
  methods: {
    saveFood: function (mat) {
      this.dialog = true
      this.clicked = mat
    }
  }
}
</script>
