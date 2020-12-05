import React, { useEffect, useState } from 'react'

import UsersList from '../../components/UsersList/UsersList'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../components/ErrorModal/ErrorModal'

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5000/users')

        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setIsLoading(false)
        setUsers(responseData.data)
      } catch (err) {
        setIsLoading(false)
        setError(err.message)
      }
    })()
  }, [])

  const errorHandler = () => {
    setError(null)
  }

  return (
    <>
      <ErrorModal error={error} onCancel={errorHandler} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && <UsersList users={users} />}
    </>
  )
}

export default UsersPage
