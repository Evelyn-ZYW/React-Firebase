import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIJsNjEq2atxN7n_6JXD2BAQjSCdMSaYE",
  authDomain: "cooking-recipe-site.firebaseapp.com",
  projectId: "cooking-recipe-site",
  storageBucket: "cooking-recipe-site.appspot.com",
  messagingSenderId: "716871566226",
  appId: "1:716871566226:web:d4222ea583fb00238ff74b",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
