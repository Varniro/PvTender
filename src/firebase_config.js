import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import {
    getFirestore,
} from 'firebase/firestore'

import { getStorage } from "firebase/storage";

import { getDatabase} from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDm84Lu01EQugn7kwlw8T-Hk05TYfSjeuI",
    authDomain: "hackitsapiens-alpha.firebaseapp.com",
    databaseURL: "https://hackitsapiens-alpha-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hackitsapiens-alpha",
    storageBucket: "hackitsapiens-alpha.appspot.com",
    messagingSenderId: "347456835636",
    appId: "1:347456835636:web:ec45dc40588b2e1b827a61",
    databaseURL: "https://hackitsapiens-alpha-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const database = getDatabase(app);
const storage = getStorage(app)


export {
    auth,
    db,
    database,
    storage
}