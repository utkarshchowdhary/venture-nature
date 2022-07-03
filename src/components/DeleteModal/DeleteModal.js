import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'

import './DeleteModal.scss'

const DeleteModal = ({ show, onCancel, onConfirmDelete }) => {
  const content = (
    <>
      {show && <Backdrop close={onCancel} />}
      <CSSTransition
        in={show}
        timeout={200}
        classNames="slide-in-top"
        mountOnEnter
        unmountOnExit
      >
        <div className="delete-modal">
          <div className="delete-modal__header">
            <h2>Are you Sure?</h2>
          </div>
          <div className="delete-modal__content">
            <h3>
              Do you want to proceed and delete this venture? Please not that it
              can't be undone thereafter.
            </h3>
          </div>
          <div className="delete-modal__actions">
            <Button inverse onClick={onCancel}>
              Cancel
            </Button>
            <Button danger onClick={onConfirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </CSSTransition>
    </>
  )

  return ReactDOM.createPortal(content, document.getElementById('modal-root'))
}

export default DeleteModal
