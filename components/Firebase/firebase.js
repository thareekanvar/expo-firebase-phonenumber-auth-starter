import * as firebase from "firebase";
import "firebase/auth";

import firebaseConfig from "./firebaseConfig";

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const logout = () => auth.signOut();
