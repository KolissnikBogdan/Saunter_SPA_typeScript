import firebase from 'firebase/app'

import { IUser } from '../models/user'
import { authTypes } from '../store/reducers/authReducer'

export function signIn(
  credentials: IUser
): (dispatch: Function, getState: object) => void {
  return (dispatch: Function, getState: object) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((res) => {
        dispatch({ type: authTypes.LOGIN })
      })
      .catch((err): any => {
        dispatch({ type: authTypes.LOGIN_ERR, payload: err.message })
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
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        dispatch({ type: authTypes.SIN_UP })
        return firestore.collection('users').doc(res?.user?.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        })
      }).catch((err): any => {
      dispatch({ type: authTypes.SIN_UP_ERR, payload: err.message })
    })
  }
}

export function signOut(): (dispatch: Function, getState: object) => void {
  return (dispatch: Function, getState: object) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log()
      })
  }
}
