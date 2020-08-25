import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

import { IUser } from '../../models/user'
import { RootState } from '../../store'
import { signUp } from '../../actions/authActions'

import useForm from '../../utils/hooks/useForm'

import './styles.scss'
import { validateFormRegister } from '../../utils/validationForm'

const Register = () => {
  const { handleSubmit, handleChange, state, errors } = useForm(
    submit,
    validateFormRegister
  )

  const auth = useSelector((state: RootState) => state.firebase.auth)
  const authP = useSelector((state: RootState) => state.auth.authErrorRegister)

  const dispatch = useDispatch()
  const history = useHistory()

  function submit() {
    dispatch(signUp(state as IUser))
    history.push('/login')
  }

  if (!auth.isEmpty) return <Redirect to="/" />
  return (
    <div className="col-md-4" id={'login'}>
      <section id={"inner-wrapper"} className="login">
        <article>
          <form onSubmit={handleSubmit}>
            <h5 className="grey-text text-darken-3 mb-4">Sign Up</h5>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user"> </i>
                </span>
                <input
                  type="email"
                  id={'email'}
                  className="form-control"
                  placeholder="Email Address"
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.email && (<p style={{color: 'red', fontSize: '12px'}}>{errors.email}</p>)}

            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-key"> </i>
                </span>
                <input
                  type="password"
                  id={'password'}
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.password && (<p style={{color: 'red', fontSize: '12px'}}>{errors.password}</p>)}

            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-key"> </i>
                </span>
                <input
                  type="text"
                  id={'firstName'}
                  className="form-control"
                  placeholder="First name"
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.firstName && (<p style={{color: 'red', fontSize: '12px'}}>{errors.firstName}</p>)}

            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-key"> </i>
                </span>
                <input
                  type="text"
                  id={'lastName'}
                  className="form-control"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.lastName && (<p style={{color: 'red', fontSize: '12px'}}>{errors.lastName}</p>)}
            {authP && (<b className="error" style={{ color: 'red' }}>{authP}</b>)}

            <button className="btn btn-outline-success btn-block" type={'submit'}>Register</button>
          </form>
        </article>
      </section>
    </div>
  )
}

export default Register
