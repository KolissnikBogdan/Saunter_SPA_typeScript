import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useForm from '../../utils/hooks/useForm'

import { signIn } from '../../actions/authActions'
import { IUser } from '../../models/user'
import { RootState } from '../../store'
import { validateFormLogin } from '../../utils/validationForm'

import './styles.scss'

const Login = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth)
  const authErrorLogin = useSelector((state: RootState) => state.auth.authErrorLogin)
  const isJustRegister = useSelector((state: RootState) => state.auth.isJustRegister)

  const history = useHistory()
  const dispatch = useDispatch()

  const { handleSubmit, handleChange, state, errors } = useForm(
    submit,
    validateFormLogin
  )

  function submit() {
    dispatch(signIn(state as IUser))
    history.push('/')
  }

  if (!auth.isEmpty && !isJustRegister) return <Redirect to="/" />
  return (
    <div className="container">
      <div className="col-md-4" id={'login'}>
        <section id={'inner-wrapper'} className="login">
          <article>
            <form onSubmit={handleSubmit}>
              <h5 className="grey-text text-darken-3 mb-4">Sign In</h5>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    id={'email'}
                    className="form-control"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {errors.email && (
                <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>
              )}

              <div className="form-group">
                <div className="input-group">
                  <input
                    type="password"
                    id={'password'}
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {errors.password && (
                <p style={{ color: 'red', fontSize: '12px' }}>
                  {errors.password}
                </p>
              )}
              {authErrorLogin && authErrorLogin ? (
                <p style={{ color: 'red', fontSize: '12px' }}>*{authErrorLogin}</p>
              ) : null}

              <button className="btn btn-outline-success btn-block">
                Login
              </button>
              <button
                className="btn btn-outline-warning btn-block"
                type="button"
                onClick={() => history.push('/register')}
              >
                Register
              </button>
            </form>
          </article>
        </section>
      </div>
    </div>
  )
}

export default Login
