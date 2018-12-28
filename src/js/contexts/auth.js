import React, { createContext, useState, useCallback, useEffect } from 'react'
import { auth } from '../utils/firebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  const signup = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      auth.onAuthStateChanged(user => setCurrentUser(user))
    } catch (e) {
      console.log(e.code, e.message)
    }
  }

  const signin = async (email, password) => {
    try {
      console.log('signin')
      await auth.signInWithEmailAndPassword(email, password)
      auth.onAuthStateChanged(user => setCurrentUser(user))
    } catch (e) {
      console.log(e.code, e.message)
    }
  }

  const signout = async () => {
    try {
      await auth.signOut()
      auth.onAuthStateChanged(user => setCurrentUser(user))
    } catch (e) {
      console.log(e.code, e.message)
    }
  }

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
