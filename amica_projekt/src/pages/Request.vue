<template>
  <div class="flex flex-center">
    <p v-html="info"></p>
  </div>
</template>

<script>
const axios = require('axios').default

export default {
  name: 'app',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd

    axios
      .get('https://cors-anywhere.herokuapp.com/https://foodandco.se/api/restaurant/menu/day?date=' + today + '&language=sv&restaurantPageId=188244')
      .then(response => (this.info = response.data.LunchMenu.Html))
  }
}
</script>
