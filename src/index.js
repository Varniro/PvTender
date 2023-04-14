import { getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { auth, database, db } from '././firebase_config';

onValue(sRef(database),(snap)=>{
    console.log(snap.val());
})