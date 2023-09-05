import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({})
	const signUp = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
		setDoc(doc(db, 'users', email), {
			savedMovie: [],
		})
	}
	const logIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}
	const logOut = () => {
		return signOut(auth)
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
		})
		return () => {
			unsubscribe()
		}
	})
	return <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>{children}</AuthContext.Provider>
}
export default AuthContext
