import { IPathItem } from '../../models/pathItem'

export enum actionTypes {
  ADD = 'ITEM_ADD',
  DELETE = 'ITEM_DELETE',
  SELECT = 'ITEM_SELECTED',
  MARK = 'ITEM_MARK',
}

interface IAddItemsAction {
  type: actionTypes.ADD
  payload: IPathItem
}

interface IDeleteItemsAction {
  type: actionTypes.DELETE
}

interface ISelectItemAction {
  type: actionTypes.SELECT
  payload: IPathItem
}

interface IMarkFavorite {
  type: actionTypes.MARK
  payload: IPathItem
}

type ItemsActions =
  | IAddItemsAction
  | IDeleteItemsAction
  | ISelectItemAction
  | IMarkFavorite

export interface IState {
  readonly items: IPathItem[]
  readonly selectedItem: IPathItem | null
}

export const initState: IState = {
  items: [],
  selectedItem: null,
}

export default function userInfo(
  state = initState,
  actions: ItemsActions,
): IState {
  switch (actions.type) {
    case actionTypes.ADD:
      state.items.push(actions.payload)
      const array = state.items.sort(
        (a: any, b: any) => b.createAt - a.createAt,
      )
      return {
        ...state,
        selectedItem: array[0],
        items: array,
      }
    case actionTypes.DELETE:
      return { ...initState }
    case actionTypes.SELECT:
      return {
        ...state,
        selectedItem: actions.payload,
      }
    default:
      return state
  }
}
