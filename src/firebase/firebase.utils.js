import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCGbnWz5eoB6fmOhCOAkA-eaAheX2i1SAg",
    authDomain: "react-notes-d3315.firebaseapp.com",
    databaseURL: "https://react-notes-d3315.firebaseio.com",
    projectId: "react-notes-d3315",
    storageBucket: "react-notes-d3315.appspot.com",
    messagingSenderId: "592874232492",
    appId: "1:592874232492:web:d9f3b245c3167488aa9d09",
    measurementId: "G-PN3PLNQCTK"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);