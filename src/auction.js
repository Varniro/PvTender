import { auth, database, db } from '././firebase_config';
import { getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { doc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword ,updateProfile , createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    if (user) {  
          
    } else {
      window.location.href = "index.html"
    }
  })

const queryString = window.location.search.toString().slice(4);   

let lowest;
let budget;

console.log(queryString)

onValue(sRef(database,`posts/${queryString}`), (snap) =>{
        document.getElementById('aucTitle').innerHTML = snap.val().title
        document.getElementById('desc').innerHTML = snap.val().desc
        document.getElementById('postImg').src = snap.val().img
        lowest = parseInt(snap.val().lBid);
        budget = parseInt(snap.val().budget);
        document.getElementById('lowest').innerHTML = "Current Lowest Bid: " + (snap.val().lBid || "No bids yet.")
        document.getElementById('lwrThn').innerHTML = "Place a lower bid then Rs." + (snap.val().lBid || snap.val().budget)
})

onValue(sRef(database, `posts/${queryString}/bids`), (snap) =>{
    document.getElementsByClassName('list-group')[0].innerHTML = ""
    snap.forEach((bid) =>{
        const item = document.createElement('li');
        item.classList = "list-group-item";
        item.innerHTML = bid.val().bid;
        document.getElementsByClassName('list-group')[0].appendChild(item)
    })
})

document.getElementById('cnfBid').addEventListener('click', (e)=>{
    if(parseInt(document.getElementById('bid').value) < budget){
        if(lowest){
            if(parseInt(document.getElementById('bid').value) <lowest){
                onAuthStateChanged(auth, (user) => {
                    if (user) {  
                        update(sRef(database,`posts/${queryString}/bids/${user.uid}`),{
                            bid : document.getElementById('bid').value
                        })
                        update(sRef(database,`posts/${queryString}`),{
                            lBid: document.getElementById('bid').value
                        })
                        update(sRef(database, `users/${user.uid}/bids`),{
                            queryString: document.getElementById('bid').value
                        })
                    } else {
                        window.location.href = "index.html"
                    }
                    })
            }
        }else{
            onAuthStateChanged(auth, (user) => {
                if (user) {  
                    update(sRef(database,`posts/${queryString}/bids/${user.uid}`),{
                        bid : document.getElementById('bid').value
                    })
                    update(sRef(database,`posts/${queryString}`),{
                        lBid: document.getElementById('bid').value
                    })
                    update(sRef(database, `users/${user.uid}/bids`),{
                        [queryString]: document.getElementById('bid').value
                    })
                } else {
                    window.location.href = "index.html"
                }
                })
        }
    }
})  