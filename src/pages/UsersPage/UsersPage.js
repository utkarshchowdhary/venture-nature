import React, { useEffect, useState } from 'react'

import UsersList from '../../components/UsersList/UsersList'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../components/ErrorModal/ErrorModal'
import useHttpClient from '../../hooks/useHttpClient'

const UsersPage = () => {
  const { isLoading, error, dispatchRequest, clearError } = useHttpClient()
  const [users, setUsers] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const responseData = await dispatchRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        )

        setUsers(responseData.data)
      } catch (err) {}
    })()
  }, [dispatchRequest])

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading ? <LoadingSpinner /> : <UsersList users={users} />}
    </>
  )
}

export default UsersPage
