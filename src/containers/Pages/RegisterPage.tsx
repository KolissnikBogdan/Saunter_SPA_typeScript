import React, { useState } from 'react'
import { IUser } from '../../models/user'
import { signUp } from '../../actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { RootState } from '../../store'

const Register = () => {
  const [state, setState] = useState<Partial<IUser>>({})

  const dispatch = useDispatch()

  const handleChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement
    setState({
      ...state,
      [target.id]: target.value,
    })
  }

  //const history = useHistory(); Історію перенести в акшіонси

  const handleSubmit = (e: any): void => {
    e.preventDefault()
    dispatch(signUp(state as IUser))
  }



  const auth = useSelector((state: RootState) => state.firebase.auth)

  if (auth.uid) return <Redirect to="/" />
  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id='firstName' onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id='lastName' onChange={handleChange} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Register
