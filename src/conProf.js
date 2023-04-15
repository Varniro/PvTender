import { auth, database, db } from '././firebase_config';
import { getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { doc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword ,updateProfile , createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


const queryString = window.location.search.toString().slice(4);   

onAuthStateChanged(auth, (user) => {
    if (user) {  
        const queryString = window.location.search.toString().slice(4);   
        if(queryString !=  user.uid){
            document.getElementById('edit').style.display = "none"
        }
    } else {
      window.location.href = "index.html"
    }
  })


onValue(sRef(database,`users/${queryString}`), (snap) =>{
        document.getElementById('name').innerHTML = snap.val().name
        document.getElementById('loc').innerHTML = snap.val().city
        document.getElementById('postImg').src = snap.val().img
        lowest = snap.val().lBid;
        budget = snap.val().budget
        document.getElementById('lowest').innerHTML = "Current Lowest Bid: " + (snap.val().lBid || "No bids yet.")
        document.getElementById('lwrThn').innerHTML = "Place a lower bid then Rs." + (snap.val().lBid || snap.val().budget)
})