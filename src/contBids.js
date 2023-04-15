import { auth, database, db } from '././firebase_config';
import { getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { doc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword ,updateProfile , createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    if (user) {  
        onValue(sRef(database,`users/${user.uid}`), (snap) =>{
            document.getElementById('name').innerHTML = snap.val().name
            document.getElementById('location').innerHTML = snap.val().city 
        })

        onValue(sRef(database, `users/${user.uid}/bids`),(snap) => {
            let count = 0;
            snap.forEach((post) =>{
                let card = document.getElementById('card').cloneNode(true);
                console.log(`posts/${Object.keys(snap.val())[count]}`)
                onValue(sRef(database,`posts/${Object.keys(snap.val())[count]}`),(ss) =>{
                    card.children[1].innerHTML = ss.val().title
                })

                const id = Object.keys(snap.val())[count]

                card.addEventListener('click', (e) =>{
                    e.preventDefault();
                    window.location.href = "auction.html?id=" + id
                })

                document.getElementById('holder').appendChild(card)

                count++
            })

            document.getElementById('holder').children[0].remove()
        })
    
          
    } else {
      window.location.href = "index.html"
    }
  })