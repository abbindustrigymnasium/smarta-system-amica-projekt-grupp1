import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

let db
let auth
export default ({ Vue }) => {
  Vue.use(firestorePlugin)

  var firebaseConfig = {
    apiKey: 'AIzaSyDAeUone08CW7t3OWQVuMlt9-BeoOJVhIQ',
    authDomain: 'amica-project1.firebaseapp.com',
    databaseURL: 'https://amica-project1.firebaseio.com',
    projectId: 'amica-project1',
    storageBucket: 'amica-project1.appspot.com',
    messagingSenderId: '1099481724223',
    appId: '1:1099481724223:web:618e5764501af3cb638f8a',
    measurementId: 'G-87ML5P20G5'
  }

  firebase.initializeApp(firebaseConfig)
  db = firebase.firestore()
  auth = firebase.auth()
}

export { db }
export { auth }
