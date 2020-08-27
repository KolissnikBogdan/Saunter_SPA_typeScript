import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import firebase from 'firebase/app'

import { storage } from '../../../config/fbConfig'
import { RootState } from '../../../store'
import {
  updatePhoto,
  updProfileInfo,
  updProfileEmail,
} from '../../../actions/userProfiel'
import { reauthenticate } from '../../../utils/reauthenticate'

import './style.css'

const Profile = () => {
  const dispatch = useDispatch()
  useFirestoreConnect(['users'])
  let initState = { firstName: '', lastName: '', email: '' }

  const [state, setState] = useState<Partial<any>>(initState)
  const [currentPassword, setCurrentPassword] = useState<any>('')
  const [newEmail, setNewEmail] = useState<any>('')
  const [image, setImage] = useState<any>(null)

  const profileChanges = useSelector((state: RootState) => state.user.profileChanges)
  const curUser: any = firebase.auth().currentUser

  const handleImgChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleInputChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement
    setState({
      ...state,
      [target.id]: target.value,
    })
  }

  const handleUploadImg = (): void => {
    const uploadTask = storage.ref(`images/${curUser.uid}`).put(image)
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref('images')
          .child(curUser.uid)
          .getDownloadURL()
          .then(url => {
            firebase.auth().currentUser?.updateProfile({
              photoURL: url,
            })
            dispatch(updatePhoto(url))
          })
      }
    )
  }
  const handleChangeNewEmail = (e: any): void => {
    let target = e.target as HTMLInputElement
    setNewEmail(target.value)
  }

  const handleChangePassword = (e: any): void => {
    let target = e.target as HTMLInputElement
    setCurrentPassword(target.value)
  }

  const handleUploadInfo = (e: any): void => {
    e.preventDefault()
    if (state.firstName !== '' && state.lastName !== '') {
      dispatch(updProfileInfo(state.firstName, state.lastName))
    }
    if ((newEmail !== '' && currentPassword !== null) && (newEmail === state.email) ) {
      dispatch(updProfileEmail(newEmail, reauthenticate(currentPassword)))
    }
  }

  const playHold = curUser?.displayName.split(' ')

  return (
    <>
      <React.Fragment>
        <div className="container">
          <div className="view-account">
            <div className="module-inner">
              <div className="side-bar">
                <div className="user-info">
                  <img
                    src={curUser.photoURL || profileChanges}
                    className="img-profile"
                    alt=""
                  />
                  <ul className="meta list list-unstyled">
                    <li className="name">{curUser.displayName}</li>
                    <li className="email">{curUser.email}</li>
                    <li className="activity">
                      Last logged in: Today at 2:18pm
                    </li>
                  </ul>
                </div>
                <nav className="side-menu">
                  <ul className="nav">
                    <li className="active">
                      <a href="#">Settings</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="content-panel">
                <form className="form-horizontal">
                  <fieldset className="fieldset">
                    <h3 className="fieldset-title">Personal Info</h3>
                    <div className="form-group avatar">
                      <figure className="figure col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <img
                          className="mini-img"
                          src={curUser.photoURL || profileChanges}
                          alt=""
                        />
                      </figure>
                      <div className="form-inline col-lg-10 col-md-10 col-sm-9 col-xs-12">
                        <input
                          type="file"
                          onChange={handleImgChange}
                          className="file-uploader pull-left"
                        />
                        <button
                          type="button"
                          onClick={handleUploadImg}
                          className="btn btn-sm btn btn-secondary pull-left"
                        >
                          Update Image
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                        First Name
                      </label>
                      <div className="col-md-10 col-sm-9 col-xs-12">
                        <input
                          type="text"
                          id={'firstName'}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder={playHold[0]}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                        Last Name
                      </label>
                      <div className="col-md-10 col-sm-9 col-xs-12">
                        <input
                          type="text"
                          id={'lastName'}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder={playHold[1]}
                        />
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="fieldset">
                    <h3 className="fieldset-title">Contact Info</h3>
                    <div className="form-group">
                      <label className="col-md-2  col-sm-3 col-xs-12 control-label">
                        Email
                      </label>
                      <div className="col-md-10 col-sm-9 col-xs-12">
                        <input
                          type="email"
                          id={'email'}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder={curUser.email}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                        Confirm Email
                      </label>
                      <div className="col-md-10 col-sm-9 col-xs-12">
                        <input
                          type="text"
                          id={'newEmail'}
                          onChange={handleChangeNewEmail}
                          className="form-control"
                          placeholder={'Confirm new email'}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                        Password
                      </label>
                      <div className="col-md-10 col-sm-9 col-xs-12">
                        <input
                          type="password"
                          id={'currentPassword'}
                          onChange={handleChangePassword}
                          className="form-control"
                          placeholder={'Current password'}
                        />
                      </div>
                    </div>
                  </fieldset>
                  <hr />
                  <div className="form-group">
                    <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                      <input
                        className="btn btn-primary"
                        onClick={handleUploadInfo}
                        type="button"
                        value="Update Profile"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  )
}

export default Profile
