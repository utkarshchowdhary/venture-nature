import { useState, useCallback, useEffect } from 'react'

let logoutTimer

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [tokenTerminationDate, setTokenTerminationDate] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((userId, token, expirationDate) => {
    setToken(token)
    setUserId(userId)

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)

    setTokenTerminationDate(tokenExpirationDate)

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationDate.toISOString()
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenTerminationDate(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (userData && new Date(userData.expiration) > new Date()) {
      login(userData.userId, userData.token, new Date(userData.expiration))
    }
  }, [login])

  useEffect(() => {
    if (tokenTerminationDate) {
      const remainingTime =
        tokenTerminationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [logout, tokenTerminationDate])

  return { token, userId, login, logout }
}

export default useAuth
