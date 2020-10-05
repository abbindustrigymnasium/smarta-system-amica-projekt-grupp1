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
        <q-btn flat style="color: #000000; width: 100%; height: 35vh" size="24px" :label="mat1" @click=toggleDialog(1,mat1) />
        <q-btn flat style="color: #000000; width: 100%; height: 35vh" size="24px" label="Kötbullar" @click=toggleDialog(1,mat2) />
      </div>
      <div class="col-6">
        <q-btn flat style="color: #000000; width: 100%; height: 35vh" size="24px" label="Pizza" @click=toggleDialog(1,mat3) />
        <q-btn flat style="color: #000000; width: 100%; height: 35vh" size="24px" label="Soppa" @click=toggleDialog(1,mat4) />
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
      <q-dialog v-model="dialog2" class="flex flex-center">
        <q-card>
          <q-input v-model="searchModel" placeholder="Search"></q-input>
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
      dialog1: false,
      dialog2: false,
      mat1: 'spaghetti med köttfärsås',
      mat2: 'köttbullar',
      mat3: 'pizza',
      mat4: 'soppa',
      clicked: '',
      searchModel: ''
    }
  },
  methods: {
    toggleDialog: function (state, mat) {
      if (state === 1) {
        this.dialog1 = !this.dialog1
        this.clicked = mat
      }
      if (state === 2) {
        this.dialog1 = !this.dialog1
        this.dialog2 = !this.dialog2
      }
    }
  }
}
</script>
