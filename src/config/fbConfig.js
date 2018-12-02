import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyACL5L1u73-vbKN0XqNz3GEdCD8ANsvaDs",
  authDomain: "projectplan-1.firebaseapp.com",
  databaseURL: "https://projectplan-1.firebaseio.com",
  projectId: "projectplan-1",
  storageBucket: "projectplan-1.appspot.com",
  messagingSenderId: "97466659905"
};

//initialize firebase instance
firebase.initializeApp(config);
//initialize Cloud Firestore through firebase
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
