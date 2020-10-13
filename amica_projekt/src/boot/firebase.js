import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseService from '../services/firebase'

let db

export default ({ Vue, store }) => {
  Vue.use(firestorePlugin)

  const firebaseConfig = {
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

  // Tell the application what to do when the
  // authentication state has changed
  firebaseService.auth().onAuthStateChanged((user) => {
    firebaseService.handleOnAuthStateChanged(store, user)
  }, (error) => {
    console.error(error)
  })

  Vue.prototype.$fb = firebaseService
  store.$fb = firebaseService

  db = firebase.firestore()
}

export { db }
