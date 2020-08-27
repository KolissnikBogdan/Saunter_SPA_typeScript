import firebase from 'firebase'

export const reauthenticate = (currentPassword: string) => {
  const user: any = firebase.auth()?.currentUser
  const cred = firebase.auth.EmailAuthProvider.credential(
    user?.email,
    currentPassword
  )
  return user.reauthenticateWithCredential(cred)
}