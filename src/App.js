import React from 'react'
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
import useAuth from './hooks/useAuth'

const App = () => {
  const { token, userId, login, logout } = useAuth()

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
