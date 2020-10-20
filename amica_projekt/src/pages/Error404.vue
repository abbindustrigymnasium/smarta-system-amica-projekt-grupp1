<template>
  <div class="bg-primary window-height window-width row q-pa-md justify-center items-center">
    <div class="bg-primary" style="padding:1%; border-radius: 25px;">
      <div style="font-size: 30vh" class="text-positive">
        404
      </div>

      <div class="text-h2 text-red-4" style="opacity:.9">
        Oops. Nothing here...
      </div>

      <q-btn class="q-mt-xl bg-secondary" text-color="negative" flat label="Go Home" no-caps @click="home" style="border-radius: 0px"/>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  methods: {
    home: function () {
      this.$router.push({ path: '/' })
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
