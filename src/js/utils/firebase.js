import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyBlLgPOl1PKC3gaHZUIfZk-IbZguTdnEoM',
  authDomain: 'react-firebase-todo-9e8cd.firebaseapp.com',
  databaseURL: 'https://react-firebase-todo-9e8cd.firebaseio.com',
  projectId: 'react-firebase-todo-9e8cd',
  storageBucket: 'react-firebase-todo-9e8cd.appspot.com',
  messagingSenderId: '633943250831',
})

const auth = firebase.auth()

export { auth }
