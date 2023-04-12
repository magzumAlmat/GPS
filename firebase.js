
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBBkVq1Ezv5glXYJBXarPhF-WSZPjxN6IA",
  authDomain: "db111-f1c86.firebaseapp.com",
  databaseURL: "https://db111-f1c86-default-rtdb.firebaseio.com",
  projectId: "db111-f1c86",
  storageBucket: "db111-f1c86.appspot.com",
  messagingSenderId: "950399823393",
  appId: "1:950399823393:web:a073d97150e03169ec7d60"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export {firebase}



