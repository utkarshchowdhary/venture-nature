import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Map from '../Map/Map';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

import './MapModal.scss';

const MapModal = ({ show, address, onCancel, location: { lng, lat } }) => {
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
        <div className="map-modal">
          <div className="map-modal__header">
            <h2>{address}</h2>
          </div>
          <div className="map-modal__content">
            <Map center={[lng, lat]} zoom={10} />
          </div>
          <div className="map-modal__actions">
            <Button onClick={onCancel}>Close</Button>
          </div>
        </div>
      </CSSTransition>
    </>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default MapModal;
