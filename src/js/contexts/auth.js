import React, { createContext, useState, useCallback, useEffect } from 'react'
import { auth } from '../utils/firebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  const signup = useCallback(async (email, password) => {
    try {
      setLoading(true)
      await auth.createUserWithEmailAndPassword(email, password)
    } catch (e) {
      console.error(e.code, e.message)
    }
  }, [])

  const signin = useCallback(async (email, password) => {
    try {
      setLoading(true)
      await auth.signInWithEmailAndPassword(email, password)
    } catch (e) {
      console.error(e.code, e.message)
    }
  }, [])

  const signout = useCallback(async () => {
    try {
      setLoading(true)
      await auth.signOut()
    } catch (e) {
      console.error(e.code, e.message)
    }
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setLoading(false)
      setCurrentUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        signin,
        signout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
