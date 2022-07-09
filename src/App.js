import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Header from './components/Header/Header'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import AuthContext from './context/AuthContext'
import useAuth from './hooks/useAuth'

const UsersPage = lazy(() => import('./pages/UsersPage/UsersPage'))
const NewVenturePage = lazy(() =>
  import('./pages/NewVenturePage/NewVenturePage')
)
const UserVenturesPage = lazy(() =>
  import('./pages/UserVenturesPage/UserVenturesPage')
)
const UpdateVenturePage = lazy(() =>
  import('./pages/UpdateVenturePage/UpdateVenturePage')
)
const SignInAndSignUpPage = lazy(() =>
  import('./pages/SignInAndSignUpPage/SignInAndSignUpPage')
)

const App = () => {
  const { isChecking, token, userId, login, logout } = useAuth(60 * 60 * 1000)

  return (
    <AuthContext.Provider
      value={{
        isChecking,
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout
      }}
    >
      <Router>
        <Header />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route path="/" component={UsersPage} exact />
              <Route
                path="/auth"
                render={() =>
                  isChecking ? (
                    <LoadingSpinner />
                  ) : token ? (
                    <Redirect to="/" />
                  ) : (
                    <SignInAndSignUpPage />
                  )
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
                  isChecking ? (
                    <LoadingSpinner />
                  ) : token ? (
                    <NewVenturePage />
                  ) : (
                    <Redirect to="/auth" />
                  )
                }
                exact
              />
              <Route
                path="/ventures/:ventureId"
                render={() =>
                  isChecking ? (
                    <LoadingSpinner />
                  ) : token ? (
                    <UpdateVenturePage />
                  ) : (
                    <Redirect to="/auth" />
                  )
                }
                exact
              />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
