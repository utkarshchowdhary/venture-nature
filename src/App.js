import React, { useState, useCallback, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Header from './components/Header/Header'
import UsersPage from './pages/UsersPage/UsersPage'
import NewVenturePage from './pages/NewVenturePage/NewVenturePage'
import UserVenturesPage from './pages/UserVenturesPage/UserVenturesPage'
import UpdateVenturePage from './pages/UpdateVenturePage/UpdateVenturePage'
import SignInAndSignUpPage from './pages/SignInAndSignUpPage/SignInAndSignUpPage'
import AuthContext from './context/AuthContext'

let logoutTimer

const App = () => {
  const [token, setToken] = useState(false)
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

    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.expiration))
    }
  }, [login])

  useEffect(() => {
    if (token && tokenTerminationDate) {
      const remainingTime =
        tokenTerminationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [logout, token, tokenTerminationDate])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/" component={UsersPage} exact />
            <Route
              path="/auth"
              render={() =>
                !token ? <SignInAndSignUpPage /> : <Redirect to="/" />
              }
              exact
            />
            <Route
              path="/:userId/ventures"
              component={UserVenturesPage}
              exact
            />
            <Route
              path="/ventures/new"
              render={() =>
                token ? <NewVenturePage /> : <Redirect to="/auth" />
              }
              exact
            />
            <Route
              path="/ventures/:ventureId"
              render={() =>
                token ? <UpdateVenturePage /> : <Redirect to="/auth" />
              }
              exact
            />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
