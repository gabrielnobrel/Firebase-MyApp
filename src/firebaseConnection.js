// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDjMEHKX3q-qUXUjOXiGyttymF__Fu7y7Q",
  authDomain: "meuapp-61d18.firebaseapp.com",
  databaseURL: "https://meuapp-61d18-default-rtdb.firebaseio.com",
  projectId: "meuapp-61d18",
  storageBucket: "meuapp-61d18.appspot.com",
  messagingSenderId: "816838169373",
  appId: "1:816838169373:web:1b6f897b1a934e33b307f4",
  measurementId: "G-R4L4S2SS8E",
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
