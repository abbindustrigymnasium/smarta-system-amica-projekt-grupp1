<template>
  <div class="bg-darkBackground window-height window-width row q-pa-md justify-center items-center">
    <div class="column">

      <div class="row">
        <q-card square bordered class="q-pa-lg bg-darkBackgroundLayer">
          <q-card-section>
            <q-form>

              <q-input color="teal-14" label-color="teal-14" dark outlined v-model="email" type="email" label="Email"/>
              <q-input color="teal-14" label-color="teal-14" dark outlined v-model="password" type="password" label="Password"/>

            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn size="lg" class="full-width bg-deep-purple-4" label="Login" @click="login"/>
          </q-card-actions>
          <q-card-actions class="q-px-md">
            <q-btn size="sm" class="full-width bg-deep-purple-4" label="devRegister" @click="devRegister"/>
          </q-card-actions>
        </q-card>
      </div>

      <q-btn class="q-mt-xl bg-darkBackgroundLayer" text-color="teal-14" unelevated label="Go Home" no-caps @click="home"/>

    </div>
  </div>
</template>

<script>
import { auth } from '../boot/firebase'

export default {
  name: 'AdminLogin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    home: function () {
      this.$router.push({ path: '/' })
    },
    login: function () {
      console.log(this.email + ' ' + this.password)
      auth.signInWithEmailAndPassword(this.email, this.password).catch(function (error) { console.log(error) })
      this.$router.push({ path: '/AdminPage' })
    },
    devRegister: function () {
      console.log(this.email + ' ' + this.password)
      auth.createUserWithEmailAndPassword(this.email, this.password).catch(function (error) { console.log(error) })
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
