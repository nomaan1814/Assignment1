import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const app=initializeApp({
    apiKey:"AIzaSyBoR1dMDOs5z67Ylv1xz10rke2GWcvisCE",
    authDomain: "authentication-327de.firebaseapp.com",
    projectId: "authentication-327de",
    storageBucket:"authentication-327de.appspot.com",
    messagingSenderId:"1015452669533",
    appId:"1:1015452669533:web:810861152e1131fcee5fb4"
})
const auth=getAuth()
export {app,auth};