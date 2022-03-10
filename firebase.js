
const firebaseConfig = {
  apiKey: "AIzaSyBDXBOBlBEIALbWS9Rx40aD-KN3yUvWBMU",
  authDomain: "todo-list-765e1.firebaseapp.com",
  projectId: "todo-list-765e1",
  storageBucket: "todo-list-765e1.appspot.com",
  messagingSenderId: "88498356494",
  appId: "1:88498356494:web:e4782b82ff1a60b2c2d75f",
  measurementId: "G-1N2J7XSGZY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();