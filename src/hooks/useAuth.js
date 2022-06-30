import { useState, useCallback, useEffect, useRef } from 'react'

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const logoutTimer = useRef(null)

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    clearTimeout(logoutTimer.current)
    localStorage.removeItem('userData')
  }, [])

  const login = useCallback(
    (
      userId,
      token,
      expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60)
    ) => {
      setToken(token)
      setUserId(userId)

      const remainingTime = expirationDate.getTime() - new Date().getTime()
      logoutTimer.current = setTimeout(logout, remainingTime)

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId,
          token,
          expiration: expirationDate.toISOString()
        })
      )
    },
    [logout]
  )

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (userData && new Date(userData.expiration) > new Date()) {
      login(userData.userId, userData.token, new Date(userData.expiration))
    }
    setIsLoading(false)

    return () => {
      clearTimeout(logoutTimer.current)
    }
  }, [login])

  return { isLoading, token, userId, login, logout }
}

export default useAuth
