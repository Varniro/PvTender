import { auth, database, db } from '././firebase_config';
import { getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { doc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword ,updateProfile , createUserWithEmailAndPassword } from "firebase/auth";


document.getElementById('password_confirm').addEventListener('blur',(e)=>{
    const password = document.getElementById('password').value
    const passwordCNF = document.getElementById('password_confirm').value

    if(password != passwordCNF){
        alert('pass nt match')
    }
})

document.getElementById('sub').addEventListener('click', (e)=>{
    e.preventDefault();

    if(document.getElementById('user_name').value == ""){
        alert('Please enter a valid name.')
        return;
    }
    if(document.getElementById('user_city').value == ""){
        alert('Please enter a valid city.')
        return;
    }
    if(document.getElementById('contact_number').value == ""){
        alert('Please enter a valid number.')
        return;
    }
    if(document.getElementById('contact_email').value == ""){
        alert('Please enter a valid email.')
        return;
    }
    if(document.getElementById('password').value == ""){
        alert('Please enter a valid password.')
        return;
    }

    const email = document.getElementById('contact_email').value
    const password = document.getElementById('password').value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;   
        set(sRef(database,`users/${user.uid}`),{
            name: document.getElementById('user_name').value,
            city:  document.getElementById('user_city').value,
            contact: document.getElementById('contact_number').value,
            userType: 'contractor'
        }).then(()=>{
            window.location.href = "dash.html"
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
})