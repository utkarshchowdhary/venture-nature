import React, { useEffect, useState } from 'react'

import VenturesList from '../../components/VenturesList/VenturesList'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../components/ErrorModal/ErrorModal'
import useHttpClient from '../../hooks/useHttpClient'

const UserVenturesPage = ({ match }) => {
  const [ventures, setVentures] = useState([])
  const { isLoading, error, dispatchRequest, clearError } = useHttpClient()
  const { userId } = match.params

  useEffect(() => {
    ;(async () => {
      try {
        const responseData = await dispatchRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/ventures`
        )

        setVentures(responseData.data)
      } catch (err) {}
    })()
  }, [dispatchRequest, userId])

  const ventureDeleteHandler = (ventureId) => {
    setVentures((prevVentures) =>
      prevVentures.filter((venture) => venture.id !== ventureId)
    )
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <VenturesList
          ventures={ventures}
          onDeleteVenture={ventureDeleteHandler}
        />
      )}
    </>
  )
}

export default UserVenturesPage
