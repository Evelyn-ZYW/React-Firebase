import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAawfPSFP3wxKDVY7cdw5ON2fQDHe1dlHQ",
  authDomain: "money-tracker-5c17a.firebaseapp.com",
  projectId: "money-tracker-5c17a",
  storageBucket: "money-tracker-5c17a.appspot.com",
  messagingSenderId: "670562853757",
  appId: "1:670562853757:web:08c5fc8bc2ac3eef0ca214",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
