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

export const getNotes = async (userId = 'GwOKuaGLNGbFnlk2ppd81VxyUY83') => {
    const notesCollectionRef = firestore.collection('notes').where('userId', '==', userId);
    const notesCollectionSnapshot = await notesCollectionRef.get();
    const notesOfUserSnapshot = await notesCollectionSnapshot.docs[0].ref.get();
    console.log(notesOfUserSnapshot.data().notesOfUser);
    return notesOfUserSnapshot.data().notesOfUser;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });
//twitterProvider.setCustomParameters({ prompt: 'select_account' });
//githubProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);
export const signInWithGithub = () => auth.signInWithPopup(githubProvider);

export default firebase;