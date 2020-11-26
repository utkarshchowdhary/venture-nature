import React from 'react';
import { withRouter } from 'react-router-dom';

import Avatar from '../Avatar/Avatar';

import './UserItem.scss';

const UserItem = ({ user, history, match }) => {
  const { id, image, name, ventureCount } = user;
  return (
    <div
      className="user-item"
      onClick={() => history.push(`${match.path}${id}/ventures`)}
    >
      <div className="user-item__content">
        <div className="user-item__image">
          <Avatar image={image} alt={name} />
        </div>
        <div className="user-item__info">
          <h2>{name}</h2>
          <h3>
            {ventureCount} {ventureCount === 1 ? 'Venture' : 'Ventures'}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserItem);
