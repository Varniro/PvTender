import {db, auth, database, storage } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

let img

document.getElementById('image').addEventListener('change', (e)=>{
    img = e.target.files[0]
})

document.getElementById('submitbt').addEventListener('click', (e)=>{
    console.log('pressed')
    e.preventDefault();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const metadata = {
                contentType: 'image',
              };

            const file = document.getElementById('image').value
            const newPostKey = push(child(sRef(database), 'posts')).key;
            const name = file.split('\\')
            console.log(name)
            const date = new Date();
            const storageRef = ref(storage,`${user.uid}/${newPostKey}/${name[2]}`);
            
            const img_upload = uploadBytesResumable(storageRef, img)

            img_upload.on('state_changed', (snap) =>{

            },
                (err) => { console.log(err) },
                async () => {
                    getDownloadURL(img_upload.snapshot.ref)
                        .then(url => {
                            const postData = {
                                // author: user.ngoName,
                                uid: user.uid,
                                desc: document.getElementById('description').value,
                                title: document.getElementById('Titleofpost').value,
                                date: document.getElementById('date').value,
                                category: document.getElementById('Categoryofpost').value,
                                location: document.getElementById('Location').value,
                                budget: document.getElementById('Budget').value,
                                img: url
                              };
                
                             const updates = {};
                            updates['/posts/' + newPostKey] = postData;
                            updates['/users/' + user.uid + '/posts/' + newPostKey] = postData;
                
                            update(sRef(database), updates);
                        })
                        .then(() => { alert("post created"); window.location.href = "index.html"})
                })

            console.log(user.uid)
        } else {
            document.location.href = "login.html"
        }
      });
})

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid)
    //   document.location.href = "ngodashboard.html"
      // ...
    } else {
        window.location.href = 'login.html'
      // User is signed out
      // ...
    }
});