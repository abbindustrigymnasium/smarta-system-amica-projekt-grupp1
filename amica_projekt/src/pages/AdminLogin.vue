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

              <q-input color="teal-14" label-color="teal-14" outlined v-model="email" type="email" label="email"/>
              <q-input color="teal-14" label-color="teal-14" outlined v-model="password" type="password" label="password"/>

            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn size="lg" class="full-width bg-deep-purple-4" label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section>
        </q-card>
      </div>

      <q-btn
        class="q-mt-xl bg-colorthingy"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />

    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data () {
    return {
      email: '',
      password: ''
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
