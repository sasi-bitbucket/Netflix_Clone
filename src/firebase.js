import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcc8Yws0MiHTbPt5CU1rwAd8S_O7NDfzk",
  authDomain: "netflix-clone-12f12.firebaseapp.com",
  projectId: "netflix-clone-12f12",
  storageBucket: "netflix-clone-12f12.appspot.com",
  messagingSenderId: "200348473923",
  appId: "1:200348473923:web:9284f52c0b2be77a3cd2f6",
  measurementId: "G-0BLW862HMP"
};

//const firebaseApp = firebase.initializeApp(firebaseConfig);

//const auth = firebase.auth();

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
//const db = firebaseApp.firestore();


export { auth }
export default db;