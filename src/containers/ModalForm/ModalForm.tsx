import React from 'react'
import cn from 'classnames'

import { Modal } from 'react-bootstrap'
import { IModalProp } from '../../models/modal'

import ModalFormBody from './ModalFormBody'

import styles from './styles.module.scss'

const PathModalForm = ({ title, ...props }: IModalProp) => {
  return (
    <Modal
      {...props}
      dialogClassName={cn({
        [styles['modal-90w']]: true,
        [styles['modal-p']]: true,
      })}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalFormBody {...props} />
      </Modal.Body>
    </Modal>
  )
}

PathModalForm.defaultProps = {
  title: 'Add new path'
}

export default PathModalForm