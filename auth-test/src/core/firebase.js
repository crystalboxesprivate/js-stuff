import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { functions } from 'firebase'

var firebaseConfig = {
  apiKey: 'AIzaSyAYjJYhy0Tdjvd3JvOnIzvZm5e5lLSzX_I',
  authDomain: 'cbportfolio-53efa.firebaseapp.com',
  databaseURL: 'https://cbportfolio-53efa.firebaseio.com',
  projectId: 'cbportfolio-53efa',
  storageBucket: 'cbportfolio-53efa.appspot.com',
  messagingSenderId: '805439234498',
  appId: '1:805439234498:web:9e52e14bc559709974365b',
  measurementId: 'G-DLPZ5CY03V',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
}

export async function generateUserDocument(user, additionalData) {
  if (!user) return

  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      })
    } catch (error) {
      console.error('Error creating user document', error)
    }
  }

  return getUserDocument(user.uid)
}

async function getUserDocument(uid) {
  if (!uid) return null
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get()

    return {
      uid,
      ...userDocument.data(),
    }
  } catch (error) {
    console.error('Error fetching user', error)
  }
}
