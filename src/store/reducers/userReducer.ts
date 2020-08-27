import { IPathItem } from '../../models/pathItem'

export enum userTypes {
  AUTH_UPDATE_SUCCESS = 'AUTH_UPDATE_SUCCESS',
  AUTH_UPDATE_ERROR = 'AUTH_UPDATE_ERROR'
}

interface IUpdateProfile {
  type: userTypes.AUTH_UPDATE_SUCCESS
  payload: any
}

interface IUpdateProfileErr {
  type: userTypes.AUTH_UPDATE_ERROR
  payload: any
}

type ProfileActions = | IUpdateProfile | IUpdateProfileErr

export interface IState {
  readonly profileChanges: any
}

export const initState: IState = {
  profileChanges: [],
}

export default function userInfo(
  state = initState,
  actions: ProfileActions,
): IState {
  switch (actions.type) {
    case userTypes.AUTH_UPDATE_SUCCESS:
      return {
        ...state,
        profileChanges: actions.payload
      }
    case userTypes.AUTH_UPDATE_ERROR:
        return {
          ...state
        }
    default:
      return state
  }
}