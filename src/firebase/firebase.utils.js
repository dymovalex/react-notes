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

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

export const getNotesRef = async (userId) => {
	try {
		const notesCollectionRef = firestore.collection('notes').where('userId', '==', userId);
		const notesCollectionSnapshot = await notesCollectionRef.get();

		if (notesCollectionSnapshot.empty) {
			const notesOfUserRef = firestore.collection('notes').doc();
			await notesOfUserRef.set({
				userId,
				notesOfUser: []
			});
			return notesOfUserRef;
		} else {
			return notesCollectionSnapshot.docs[0].ref;
		}
	} catch (error) {
		console.log(error);
	}
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });
twitterProvider.setCustomParameters({ prompt: 'select_account' });
githubProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider).catch((error) => null);
export const signInWithTwitter = () => auth.signInWithPopup(twitterProvider).catch((error) => null);
export const signInWithGithub = () => auth.signInWithPopup(githubProvider).catch((error) => null);

export default firebase;