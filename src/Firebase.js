import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL3RqgYbbjqvBGZ16nabpSbW_dW15Qedo",
  authDomain: "my-authentication-app-e672b.firebaseapp.com",
  databaseURL: "https://my-authentication-app-e672b.firebaseio.com",
  projectId: "my-authentication-app-e672b",
  storageBucket: "my-authentication-app-e672b.appspot.com",
  messagingSenderId: "793423610178",
  appId: "1:793423610178:web:9cf77d8edc59514bf408db",
  measurementId: "G-1M1FG9L52V",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
