export enum authTypes {
  LOGIN = 'LOGIN_SUCCESS',
  LOGIN_ERR = 'LOGIN_ERR',
  SIN_UP = 'SIN_UP',
  SIN_UP_ERR = 'SIN_UP_ERR',
  SING_OUT = 'SING_OUT',
  SING_OUT_ERR = 'SING_OUT_ERR',
}

interface ILoginAction {
  type: authTypes.LOGIN
}

interface ISingUpAction {
  type: authTypes.SIN_UP
}

interface ILoginErrAction {
  type: authTypes.LOGIN_ERR
  payload: any
}

interface ISingUpErrAction {
  type: authTypes.SIN_UP_ERR
  payload: any
}

interface ILogOutAction {
  type: authTypes.SING_OUT
}

type AuthActions =
  | ILoginAction
  | ILogOutAction
  | ILoginErrAction
  | ISingUpErrAction
  | ISingUpAction

export interface IState {
  readonly authErrorLogin: any
  readonly authErrorRegister: any
  isJustRegister?: boolean
}

export const initState: IState = {
  authErrorLogin: null,
  authErrorRegister: null,
  isJustRegister: false
}

export default function authInfo(
  state = initState,
  actions: AuthActions
): IState {
  switch (actions.type) {
    case authTypes.LOGIN:
      return {
        ...state,
        authErrorLogin: null,
      }
    case authTypes.LOGIN_ERR:
      return {
        ...state,
        authErrorLogin: actions.payload,
      }
    case authTypes.SIN_UP:
      return {
        ...state,
        isJustRegister: true,
        authErrorLogin: null
      }
    case authTypes.SIN_UP_ERR:
      return {
        ...state,
        authErrorRegister: actions.payload,
      }
    case authTypes.SING_OUT:
      return { ...initState, isJustRegister: false }
    default:
      return state
  }
}
