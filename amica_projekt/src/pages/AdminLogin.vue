<template>
  <div class="bg-darkBackground window-height window-width row q-pa-md justify-center items-center">
    <div class="column">

      <div class="row">
        <q-card square bordered class="q-pa-lg bg-colorthingy">
          <q-card-section>
            <q-form>

              <!-- <p class="bg-primaryColor">AAA</p>
              <p class="text-deep-purple-4">AAA</p>

              <p class="bg-secondaryColor">AAA</p>
              <p class="text-teal-14">AAA</p> -->

              <q-input color="teal-14" label-color="teal-14" dark outlined v-model="name" type="email" label="name"/>
              <q-input color="teal-14" label-color="teal-14" dark outlined v-model="password" type="password" label="password"/>

            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn size="lg" class="full-width bg-deep-purple-4" label="Login" @click="login"/>
          </q-card-actions>
          <!-- <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section> -->
        </q-card>
      </div>

      <q-btn class="q-mt-xl bg-colorthingy" text-color="teal-14" unelevated to="/" label="Go Home" no-caps/>

    </div>
  </div>
</template>

<script>
// import loginWithEmail from '../js/login.js'
// import createUserWithEmail from '../js/login.js'

export default {
  name: 'AdminLogin',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      console.log(this.name + ' ' + this.password)
    }
  }
}

</script>

<style>
  .bg-darkBackground {
    background-color: #121212;
  }
  .bg-primaryColor {
    color: #bb86fc;
  }
  .bg-secondaryColor{
    color: #03dac6;
  }
  .bg-colorthingy{
     background-color: #1F1B24;
  }
</style>
