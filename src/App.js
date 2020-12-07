import React, { useState, useCallback } from 'react'
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/" component={UsersPage} exact />
            <Route
              path="/auth"
              render={() =>
                !isLoggedIn ? <SignInAndSignUpPage /> : <Redirect to="/" />
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
                isLoggedIn ? <NewVenturePage /> : <Redirect to="/auth" />
              }
              exact
            />
            <Route
              path="/ventures/:ventureId"
              render={() =>
                isLoggedIn ? <UpdateVenturePage /> : <Redirect to="/auth" />
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
