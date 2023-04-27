import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDZSrhq57O4VewjetLINuwHN4OzZN6wRcw",
    authDomain: "example-3f2d6.firebaseapp.com",
    projectId: "example-3f2d6",
    storageBucket: "example-3f2d6.appspot.com",
    messagingSenderId: "842741956148",
    appId: "1:842741956148:web:bf79037412134f83725461"
};


export function initFirebase() {
    initializeApp(firebaseConfig);
}