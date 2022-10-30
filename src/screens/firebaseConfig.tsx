// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyCkbEe5M2aqp5f-2j5Qv_OQdgM2ayyKUK0',
  authDomain: 'serviapp-e9a34.firebaseapp.com',
  projectId: 'serviapp-e9a34',
  storageBucket: 'serviapp-e9a34.appspot.com',
  messagingSenderId: '955338859269',
  appId: '1:955338859269:web:71a2a8afb00ce67ae14d6c',
  measurementId: 'G-KKYKX8WCE9'
}

const app = initializeApp(firebaseConfig)

export default app
