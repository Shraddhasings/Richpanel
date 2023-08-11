import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyCCmlg6MXlpG2xZsGiTefqrbuK-4FSZvoE",
  authDomain: "richpanel-5b37f.firebaseapp.com",
  projectId: "richpanel-5b37f",
  storageBucket: "richpanel-5b37f.appspot.com",
  messagingSenderId: "710319587633",
  appId: "1:710319587633:web:866f3f0b85ccf3b8a2b010"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase