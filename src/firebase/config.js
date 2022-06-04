import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDH34JPoacVtZIhqiSuV92VjW4ltswId1Q",
  authDomain: "financetracker-04-06.firebaseapp.com",
  projectId: "financetracker-04-06",
  storageBucket: "financetracker-04-06.appspot.com",
  messagingSenderId: "603660518839",
  appId: "1:603660518839:web:8f134192a53d6e0457d432"
};


firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };