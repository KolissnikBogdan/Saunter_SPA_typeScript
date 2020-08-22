import { IUser } from '../../models/user'

export enum authTypes {
  LOGIN = 'LOGIN_SUCCESS',
  SING_OUT = 'SING_OUT',
}

interface ILoginAction {
  type: authTypes.LOGIN
}

interface ILogOutAction {
  type: authTypes.SING_OUT
}

type AuthActions = ILoginAction | ILogOutAction

export interface IState {
  readonly users: IUser[]
}

export const initState: IState = {
  users: []
}

export default function authInfo(
  state = initState,
  actions: AuthActions
): IState {
  switch (actions.type) {
    case authTypes.LOGIN:
      console.log(state.users);
      return {
        ...state,
      }
    case authTypes.SING_OUT:
      return { ...initState }
    default:
      return state
  }
}
