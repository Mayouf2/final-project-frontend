import { initializeApp } from "firebase/app";

import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgejwbDLos-S3QbsJe37RMDYNog6xBRwM",
  authDomain: "upload-img-89628.firebaseapp.com",
  projectId: "upload-img-89628",
  storageBucket: "upload-img-89628.appspot.com",
  messagingSenderId: "789140862794",
  appId: "1:789140862794:web:fcad7bf735363f3cfdb3b3"
};

const app = initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };