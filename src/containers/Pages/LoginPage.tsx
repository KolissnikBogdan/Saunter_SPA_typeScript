import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signIn } from '../../actions/authActions'
import { IUser } from '../../models/user'
import { RootState } from '../../store'

const Login = () => {
  const [state, setState] = useState<Partial<IUser>>({})
  const dispatch = useDispatch()

  const history = useHistory();
  const auth = useSelector((state: RootState) => state.firebase.auth)

  const handleChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement
    setState({
      ...state,
      [target.id]: target.value,
    })
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault()
    dispatch(signIn(state as IUser))
  }

  if (auth.uid) return <Redirect to="/" />
  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Login</button>
          <button className="btn pink lighten-1 z-depth-0" onClick={() => history.push('/register')}>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Login
