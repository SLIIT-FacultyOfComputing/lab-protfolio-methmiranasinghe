import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC3fjSFA1023iG1-tl-UtqotNtS4ZhlQUs",
  authDomain: "todo-list-react-native-e8520.firebaseapp.com",
  projectId: "todo-list-react-native-e8520",
  storageBucket: "todo-list-react-native-e8520.appspot.com",
  messagingSenderId: "234884093552",
  appId: "1:234884093552:web:8df249515b7037e0b706b5",
  measurementId: "G-FEF3C3EXGF",
};

const app = initializeApp(firebaseConfig);
const auth =getAuth();
const db = getFirestore()

export {
    auth,
    db
}