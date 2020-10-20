<template>
  <div class="bg-darkBackground window-height window-width row justify-center items-center">
    <div class="column col-4" style="min-width: 350px">
      <div class="row">
        <h2 class="q-pl-md text-accent">Admin Log In</h2>
        <q-card square flat class="bg-primary col-12">
          <q-card-section class="q-gutter-sm">
            <q-form>
              <q-input filled square v-if="loginError" color="positive" label-color="accent" style="font-size: 18px" dark v-model="email" type="email" label="Email"/>
              <q-input filled square v-else color="positive" label-color="accent" style="font-size: 18px" dark v-model="email" type="email" label="Email"/>
            </q-form>
            <q-form>
              <q-input filled square v-if="loginError" color="positive" label-color="accent" style="font-size: 18px" dark v-model="password" type="password" label="Password"/>
              <q-input filled square v-else color="positive" label-color="accent" style="font-size: 18px" dark v-model="password" type="password" label="Password"/>
            </q-form>
          </q-card-section>
          <!-- <q-card-actions class="q-px-md">
            <q-btn size="sm" class="full-width bg-deep-purple-4" label="devRegister" @click="devRegister"/>
          </q-card-actions> -->
          <q-card-section v-if="loginError" class="q-pl-md q-pa-none" text-color="negative" style="border-radius: 5px;">
            <p class="text-positive" style="font-weight: 300">Failed to log in. Incorrect account information.</p>
          </q-card-section>
          <q-card-section v-else-if="!loading" class="q-pl-md q-pa-none" text-color="negative" style="border-radius: 5px;">
            <p class="text-negative" style="font-weight: 300">For amica personnel only.</p>
          </q-card-section>
          <q-card-section v-else class="q-pl-md q-pa-none" text-color="negative" style="border-radius: 5px;">
            <p class="text-negative" style="font-weight: 300">Hold on. Trying to log in.</p>
          </q-card-section>
        </q-card>
        <div class="q-pt-md q-pl-md q-gutter-md row justify-between col-12">
          <q-btn v-if="loginError" class="bg-darkBackgroundLayer col-4" text-color="negative" style="font-weight: 300; font-size: 1rem" label="Log In" flat no-caps @click="login"/>
          <q-btn v-else class="bg-darkBackgroundLayer col-4" text-color="negative" label="Log In" style="font-weight: 300; font-size: 1rem" flat no-caps @click="login"/>
          <q-btn class="bg-darkBackgroundLayer col-4" text-color="negative" label="Go Home" style="font-weight: 300; font-size: 1rem" flat no-caps @click="home"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AdminLogin',
  data () {
    return {
      email: '',
      password: '',
      loginError: false,
      loading: false
    }
  },
  mounted () {
    this.routeIfLoggedIn()
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    home: function () {
      this.$router.push({ path: '/' })
    },
    routeIfLoggedIn: function () {
      this.$router.push({ path: '/AdminPage' })
    },
    login: function () {
      this.loading = true
      const user = { email: this.email, password: this.password }
      console.log(user)
      this.loginUser(user)
        .then(u => {
          this.$router.push('/AdminPage')
        })
        .catch(error => {
          console.error('Email-Password login:', error)
          this.loginError = true
          this.loading = false
          setTimeout(() => {
            this.loginError = false
          }, 4000)
        })
    }//,
    // devRegister: function () {
    //   console.log(this.email + ' ' + this.password)
    // }
  }
}

</script>

<style>
  .bg-darkBackground {
    background-color: #121716;
  }
  .bg-darkBackgroundLayer {
     background-color: #292224;
  }
  .bg-darkBackgroundLayer2 {
    background-color: #292224
  }

</style>
