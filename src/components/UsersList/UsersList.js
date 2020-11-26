import React from 'react';

import UserItem from '../UserItem/UserItem';

import './UsersList.scss';

const UsersList = ({ users }) => {
  return (
    <div className="users-list">
      {users.length === 0 && (
        <div className="users-list__empty">
          <h2>No users found</h2>
        </div>
      )}
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
