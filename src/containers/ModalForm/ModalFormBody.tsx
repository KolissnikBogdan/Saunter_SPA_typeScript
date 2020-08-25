import React from 'react'

import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebaseConnect, useFirestoreConnect } from 'react-redux-firebase'

import MapContainer from '../../components/Map/MapComponent'
import useForm from '../../utils/hooks/useForm'
import validate from '../../utils/validationForm'

import { IModalProp } from '../../models/modal'
import { addItem } from '../../actions/progectActions'
import { IPathItem } from '../../models/pathItem'
import { RootState } from '../../store'

const ModalFormBody = (props: IModalProp) => {
  useFirestoreConnect(['pathDescription'])

  const profile = useSelector((state: RootState) => state.firebase.profile);
  const auth = useSelector((state: RootState) => state.firebase.auth);

  const dispatch = useDispatch()
  const {
    handleChange,
    handleMapChange,
    handleLengthChange,
    handleSubmit,
    state,
    errors,
  } = useForm(submit, validate)

  function submit() {
    dispatch(addItem(state as IPathItem, profile, auth))
    props.onHide()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Text input"
              onChange={handleChange}
            />
            <Form.Text className="text-muted text-right">
              {errors.title && (
                <b className="error" style={{ color: 'red' }}>
                  {errors.title}
                </b>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="sDescript">
            <Form.Label>Short description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Text area"
              onChange={handleChange}
            />
            <Form.Text className="text-muted text-right">
              {errors.sDescript && (
                <b
                  className="error"
                  style={{ color: 'red' }}
                >{`${errors.sDescript} `}</b>
              )}{' '}
              Limit {state?.sDescript?.length} of 160
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="fDescript">
            <Form.Label>Full description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text area"
              onChange={handleChange}
            />
            <Form.Text className="text-muted text-right">
              {errors.fDescript && (
                <b className="error" style={{ color: 'red' }}>
                  {errors.fDescript}
                </b>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="pathLength" className="my-5 text-center">
            <Form.Label style={{ fontSize: '1.5rem' }}>
              <img
                alt="mapImage"
                src="https://cdn0.iconfinder.com/data/icons/map-36/20/map_marker-256.png"
                width="20"
                height="20"
                className="d-inline-block align-center"
              />{' '}
              Length:
              {state?.route && state?.route?.length > 1
                ? state.pathLength
                : errors.pathLength && (
                    <b className="error" style={{ color: 'red' }}>
                      {errors.pathLength}
                    </b>
                  )}
            </Form.Label>
          </Form.Group>

          <Row className="justify-content-center">
            <Button variant="outline-primary" size="lg" type="submit">
              <img
                alt="checkImage"
                src="https://cdn4.iconfinder.com/data/icons/dortmund/Dortmund-32x32/check.png"
                width="10"
                height="10"
                className="d-inline-block align-center"
              />{' '}
              Add path
            </Button>
          </Row>
        </Col>
        <Col>
          {props.show && (
            <MapContainer
              onlyView={false}
              containerElement={<div style={{ height: '100%' }} />}
              onMapChange={handleMapChange}
              onLengthChange={handleLengthChange}
            />
          )}
        </Col>
      </Form.Row>
    </Form>
  )
}

export default ModalFormBody
