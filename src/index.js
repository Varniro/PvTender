import { auth, database, db } from '././firebase_config';
import { getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { doc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword ,updateProfile , createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    if (user) {  
          document.getElementById('nav2').style.display = "none";
    } else {
        document.getElementById('nav1').style.display = "none";
    }
  })
