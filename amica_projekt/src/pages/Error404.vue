<template>
  <div class="bg-darkBackground window-height window-width row q-pa-md justify-center items-center">
    <div class="bg-darkBackgroundLayer" style="padding:1%; border-radius: 25px;">
      <div style="font-size: 30vh" class="text-red-10">
        404
      </div>

      <div class="text-h2 text-red-4" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn class="q-mt-xl bg-darkBackgroundLayer" text-color="teal-14" unelevated label="Go Home" no-caps @click="home"/>

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
