import firebase from 'firebase/app'
import { userTypes } from '../store/reducers/userReducer'

export function updatePhoto(
  newPhotoUser: any
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
    if (!firebase.auth().currentUser) {
      const error = new Error('User must be logged in to update auth.')
      dispatch({ type: userTypes.AUTH_UPDATE_ERROR, payload: error })
      return Promise.reject(error)
    }

    const firestore = getFirestore()

    return firebase
      .auth()
      .currentUser?.updateProfile({ photoURL: newPhotoUser })
      .then((payload: any) => {
        firestore
          .collection('users')
          .doc(firebase.auth().currentUser?.uid)
          .update({ photoURL: newPhotoUser })

        dispatch({
          type: userTypes.AUTH_UPDATE_SUCCESS,
          payload: newPhotoUser,
        })
        return payload
      })
      .catch(error => {
        dispatch({ type: userTypes.AUTH_UPDATE_ERROR, error })
        return Promise.reject(error)
      })
  }
}

export function updProfileInfo(
  firstName: any,
  lastName: any
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
    if (!firebase.auth().currentUser) {
      const error = new Error('User must be logged in to update auth.')
      dispatch({ type: userTypes.AUTH_UPDATE_ERROR, payload: error })
      return Promise.reject(error)
    }

    console.log(firstName, lastName)

    const firestore = getFirestore()

    return firebase
      .auth()
      .currentUser?.updateProfile({ displayName: firstName + ' ' + lastName })
      .then((payload: any) => {
        firestore
          .collection('users')
          .doc(firebase.auth().currentUser?.uid)
          .update({ firstName: firstName, lastName: lastName })

        dispatch({
          type: userTypes.AUTH_UPDATE_SUCCESS,
          payload: { firstName: firstName, lastName: lastName },
        })
        return payload
      })
      .catch(error => {
        dispatch({ type: userTypes.AUTH_UPDATE_ERROR, error })
        return Promise.reject(error)
      })
  }
}

export function updProfileEmail(
  newEmail: any,
  promise: any
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
    promise.then(() => {
      if (!firebase.auth().currentUser) {
        const error = new Error('User must be logged in to update auth.')
        dispatch({ type: userTypes.AUTH_UPDATE_ERROR, payload: error })
        return Promise.reject(error)
      }

      const firestore = getFirestore()

      return firebase
        .auth()
        .currentUser?.updateEmail(newEmail)
        .then((payload: any) => {
          firestore
            .collection('users')
            .doc(firebase.auth().currentUser?.uid)
            .update({ email: newEmail })

          dispatch({
            type: userTypes.AUTH_UPDATE_SUCCESS,
            payload: { email: newEmail },
          })
          return payload
        })
        .catch(error => {
          dispatch({ type: userTypes.AUTH_UPDATE_ERROR, error })
          return Promise.reject(error)
        })
    }).catch((error: any) => { console.log(error.message) })
  }
}