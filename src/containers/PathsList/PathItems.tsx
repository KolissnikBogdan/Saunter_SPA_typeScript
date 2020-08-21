import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Spinner,
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap'
import { useFirestoreConnect } from 'react-redux-firebase'
import cn from 'classnames'

import { IPathItem } from '../../models/pathItem'
import { RootState } from '../../store'
import { selectItem } from '../../actions/progectActions'

import PathItem from './PathItem'
import FullDecript from './PathFullDescription'

import styles from './styles.module.scss'

const PathItems: React.FC = () => {
  const [searchQuery, setQuery] = useState('')

  const inputEvent = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const data = event.target.value
    setQuery(data)
  }

  const dispatch = useDispatch()
  useFirestoreConnect(['pathDescription'])
  const pathDescription = useSelector(
    (state: RootState) => state.firestore.ordered.pathDescription
  )

  const filterItems: IPathItem[] =
    pathDescription &&
    pathDescription.filter((item: IPathItem) => {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fDescript.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  const handleClick = (path: IPathItem) => {
    dispatch(selectItem(path))
  }

  if (pathDescription && pathDescription.length !== 0) {
    return (
      <React.Fragment>
        <Row>
          <Col
            className={cn({
              ['pl-0 border-right border-dark']: true,
              [styles['colOverflow']]: true,
            })}
          >
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Type..."
                aria-describedby="basic-addon2"
                value={searchQuery}
                onChange={inputEvent}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">
                  <img
                    alt="Logo"
                    src="https://cdn1.iconfinder.com/data/icons/app-user-interface-line/64/search_focus_user_interface_app_zoom-256.png"
                    width="25"
                    height="25"
                    className="d-inline-block align-top"
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {filterItems
              .sort((a, b) => b.favorite - a.favorite)
              .map(item => (
                <PathItem
                  key={item.id}
                  item={item}
                  onInfoChange={handleClick}
                />
              ))}
          </Col>
          <Col className={styles['colOverflow']}>
            <FullDecript />
          </Col>
        </Row>
      </React.Fragment>
    )
  } else {
    return (
      <Row className="justify-content-center align-items-center">
        <h5 className="text-muted text-center text-middle">
          Add your first route &nbsp;
        </h5>
        <Spinner className="text-muted" animation="border" />
      </Row>
    )
  }
}

export default PathItems
