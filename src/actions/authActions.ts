import { IUser } from '../models/user'
import { authTypes as userActionTypes } from '../store/reducers/authReducer'
import firebase from 'firebase/app'

export function signIn(
  credentials: IUser
): (dispatch: Function, getState: object) => void {
  return (dispatch: Function, getState: object) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        return firebase
          .auth()
          .signInWithEmailAndPassword(credentials.email, credentials.password)
      })
  }
}

export function signUp(
  newUser: IUser
): (
  dispatch: Function,
  getState: object,
  { getFirestore }: { getFirestore: any }
) => void {
  return (
    dispatch: Function,
    getState: object,
    { getFirestore }: { getFirestore: any }
  ) => {
    const firestore = getFirestore()

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
      })
      .then(resp => {
        return firestore.collection('users').doc(resp?.user?.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        })
      })
  }
}

export function signOut(): (dispatch: Function, getState: object) => void {
  return (dispatch: Function, getState: object) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: userActionTypes.SING_OUT })
      })
  }
}
