import { auth, database, db } from '././firebase_config';
import { getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { doc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword ,updateProfile , createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    if (user) {  
          window.location.href = 'dis.html'
          console.log('ok')
    } else {
      window.location.href = "index.html"
    }
  })

document.getElementById('sub').addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("clicked")

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
    });
})

document.getElementById('signUp').addEventListener('click', (e) =>{
    e.preventDefault()
    window.location.href = 'https://sites.google.com/view/code-fiesta/home'
})