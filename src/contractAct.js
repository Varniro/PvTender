import { auth, database, db } from '././firebase_config';
import { getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { doc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword ,updateProfile , createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    if (user) {  
        onValue(sRef(database, `users/${user.uid}/posts`),(snap) => {
            let count = 0;
            snap.forEach((post) =>{
                let card = document.getElementById('hold').cloneNode(true);
                card.children[0].innerHTML = post.val().title;
                onValue(sRef(database, `posts/${Object.keys(snap.val())[count]}/bids`),(ss)=>{
                    ss.forEach((bid) =>{
                        onValue(sRef(database, `users/${Object.keys(ss.val())[0]}`),(s)=>{
                            card.children[1].children[0].children[0].innerHTML = s.val().name
                            if(!ss.exists()){
                                card.remove();
                            }
                            card.children[1].children[0].children[1].innerHTML = bid.val().bid
                            card.children[1].children[0].children[2].addEventListener('click',(e)=>{
                                e.preventDefault()
                                window.location.href = 'ContractorProfile.html?id='+ Object.keys(ss.val())[0]
                            })

                            card.children[1].children[0].children[3].action = "/create-checkout-session?id=" + bid.val().bid + "." + Object.keys(ss.val())[0]
                        })
                    })
                })
                document.getElementById('big').appendChild(card)
                count++
            })

            document.getElementById('hold').remove()
        })
    
          
    } else {
      window.location.href = "index.html"
    }
  })