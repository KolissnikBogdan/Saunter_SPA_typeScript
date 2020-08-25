import React from 'react'

import { Col, Row, Button, ButtonGroup, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store/index'
import { deleteItem, markFavorite } from '../../actions/progectActions'

import MapContainer from '../../components/Map/MapComponent'

const FullDecript = () => {
  const dispatch = useDispatch()
  const selectedPath = useSelector(
    (state: RootState) => state.itemDescript.selectedItem
  )

  const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(deleteItem(selectedPath?.id))
  }

  const handleIsFavorite = () => {
    dispatch(markFavorite(selectedPath?.id))
  }

  if (selectedPath) {
    return (
      <>
        <Row className="align-items-center">
          <Col>
            <h2>{selectedPath.title}</h2>
          </Col>
          <Col className="text-right">
            <h5>{selectedPath.pathLength}</h5>
          </Col>
        </Row>
        <Row>
          <Col className="pb-2">{selectedPath.fDescript}</Col>
        </Row>
        <div>
          <MapContainer
            route={selectedPath.route}
            onlyView={true}
            containerElement={<div style={{ height: '300px' }} />}
          />
        </div>
        <Row className="float-right">
          <ButtonGroup vertical>
            <Button
              variant="link"
              onClick={handleIsFavorite}
              className="text-right"
            >
              Set/unset favorite
            </Button>
            <Button
              variant="link"
              style={{ color: 'red' }}
              onClick={handleRemove}
              className="text-right"
            >
              Delete
            </Button>
          </ButtonGroup>
        </Row>
      </>
    )
  } else {
    return (
      <Row className="justify-content-center align-items-center">
        <h5 className="text-muted text-center text-middle">
          Select path to review &nbsp;
        </h5>
        <Spinner className="text-muted" animation="border" />
      </Row>
    )
  }
}

export default FullDecript
