import { IPathItem } from '../models/pathItem'
import { actionTypes as itemActionTypes } from '../store/reducers/itemReducer'

export function addItem(item: IPathItem, prof: any, auth: any): (
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

    firestore
      .collection('pathDescription')
      .add({
        ...item,
        authorFirsName: prof?.firstName,
        authorLastName: prof?.lastName,
        authorId: auth?.uid,
        createAt: new Date()
      })
      .then(() => {
        dispatch({
          type: itemActionTypes.ADD,
          payload: {
            ...item,
            authorFirsName: prof?.firstName,
            authorLastName: prof?.lastName,
            authorId: auth?.uid,
            createAt: new Date()
          },
        })
      })
  }
}

export function deleteItem(
  id: any
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
    firestore
      .collection('pathDescription')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: itemActionTypes.DELETE,
        })
      })
  }
}

export function markFavorite(
  id: any
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
    firestore
      .collection('pathDescription')
      .doc(id)
      .get()
      .then((res: any) => res.data()['favorite'])
      .then((switcher: boolean) =>
        firestore.collection('pathDescription').doc(id).update({
          favorite: !switcher,
        })
      )
  }
}

export function selectItem(selectedPath: IPathItem | null) {
  return {
    type: 'ITEM_SELECTED',
    payload: selectedPath,
  }
}
