import React from 'react'

import UsersList from '../../components/UsersList/UsersList'

const UsersPage = () => {
  return (
    <UsersList
      users={[
        {
          id: 'u1',
          image: 'https://images7.alphacoders.com/607/607078.jpg',
          name: 'Yennefer',
          ventureCount: 2
        }
      ]}
    />
  )
}

export default UsersPage
