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

  window.addEventListener("DOMContentLoaded", (event) => {
    onValue(sRef(database, `posts`), (snap) =>{
        var count = 0
        snap.forEach(post => {
            // document.getElementById('cardHolder').innerHTML = ""
            let card = document.getElementById('card').cloneNode(true);
            card.children[0].children[0].children[1].children[0].innerHTML = post.val().title
            card.children[0].children[0].children[1].children[1].innerHTML = "Budget - Rs."+post.val().budget
            card.children[0].children[0].children[1].children[2].innerHTML = "Lowest Bid - Rs."+post.val().lBid
            card.children[0].children[0].children[1].children[3].innerHTML = "Deadline "+post.val().date
            card.children[0].children[0].children[0].src = post.val().img
            document.getElementById('cardHolder').appendChild(card)
            const id = Object.keys(snap.val())[count]
            card.children[0].children[0].children[2].addEventListener('click',(e)=>{
                e.preventDefault();
                window.location.href = `auction.html?id=` + id
            })
    
            console.log(Object.keys(snap.val())[count])
    
            count++;
        });
        document.getElementById('cardHolder').children[0].remove()
    })
  })