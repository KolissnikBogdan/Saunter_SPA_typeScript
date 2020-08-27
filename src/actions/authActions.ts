import firebase from 'firebase/app'

import { IUser } from '../models/user'
import { authTypes } from '../store/reducers/authReducer'

import history from '../history/history'

export function signIn(
  credentials: IUser
): (dispatch: Function, getState: object) => void {
  return (dispatch: Function, getState: object) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((res: any) => {
        localStorage.setItem('token', JSON.stringify(res));
        dispatch({ type: authTypes.LOGIN })
        history.push('/dashboard')
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
        history.push('/login')
        res.user?.updateProfile({
          displayName: newUser.firstName + ' ' + newUser.lastName,
          photoURL: 'https://cdn0.iconfinder.com/data/icons/elasto-online-store/26/00-ELASTOFONT-STORE-READY_user-circle-256.png'
        })
        firestore
          .collection('users')
          .doc(res?.user?.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            photoURL: 'https://cdn0.iconfinder.com/data/icons/elasto-online-store/26/00-ELASTOFONT-STORE-READY_user-circle-256.png',
            createAt: new Date(),
            email: newUser.email
          })
      })
      .then()
      .catch((err): any => {
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
        localStorage.removeItem('token')
        history.push('/login')
      })
  }
}
