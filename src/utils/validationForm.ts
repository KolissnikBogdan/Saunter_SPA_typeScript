import { IPathItem } from '../models/pathItem'
import { IUser } from '../models/user'

const nameStruct = /[A-Z][a-zA-Z]*/
const emailStruct = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
const passwordStruct = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/

export function validateFormRegister(values: IUser, isReg: boolean) {
  const errors = {} as IUser

  if (!values?.email) {
    errors.email = 'Email is empty!'
  } else if(!emailStruct.test(values.email)) {
    errors.email = "Email is not correct! Please follow the template: email@email.com!"
  }
  if (!values?.password) {
    errors.password = 'Password is empty!'
  } else if (!passwordStruct.test(values?.password)) {
    errors.password = 'Password must contain at least 6 characters, including upper + lowercase, numbers and special symbols: !$%^&*()_-+=@~#<,>.?!'
  }
  if (!values?.firstName) {
    errors.firstName = 'First name is empty!'
  } else if(!nameStruct.test(values.firstName)) {
    errors.firstName = 'First name must contain only characters and begin with a capital letter!'
  }
  if (!values?.lastName) {
    errors.lastName = 'Last name is empty!'
  } else if(!nameStruct.test(values.lastName)) {
    errors.lastName = 'Last name must contain only characters and begin with a capital letter!'
  }

  return errors
}

export function validateFormLogin(values: IUser) {
  const errors = {} as IUser

  if (!values?.email) {
    errors.email = 'Email is empty!'
  } else if(!emailStruct.test(values.email)) {
    errors.email = "Email is not correct! Please follow the template: email@email.com!"
  }
  if (!values?.password) {
    errors.password = 'Password is empty!'
  } else if (!passwordStruct.test(values?.password)) {
    errors.password = 'Password must contain at least 6 characters, including upper + lowercase, numbers and special symbols: !$%^&*()_-+=@~#<,>.?!'
  }

  return errors
}

export default function validateForm(values: IPathItem) {
  const errors = {} as IPathItem
  if (!values.title) {
    errors.title = 'Title is empty!'
  }
  if (!values.sDescript) {
    errors.sDescript = 'Short description is empty!'
  } else if (values.sDescript.length > 160) {
    errors.sDescript = 'Short description exceeds 160 characters!'
  }
  if (!values.fDescript) {
    errors.fDescript = 'Full description  is empty!'
  }
  if (!values.route) {
    errors.pathLength = 'path direction is missing!'
  } else if (values.route.length <= 1) {
    errors.pathLength = 'path direction is too short!'
  }
  return errors
}