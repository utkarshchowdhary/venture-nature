import { createContext } from 'react'

const AuthContext = createContext({
  isChecking: true,
  isLoggedIn: false,
  token: '',
  userId: '',
  login: () => {},
  logout: () => {}
})

export default AuthContext
