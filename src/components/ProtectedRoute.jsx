
import { useContext } from 'react'
import AuthContext from './store/AuthContext'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children }) => {
	const ctx = useContext(AuthContext)
	if (!ctx.user) {
		return <Navigate to="/" />
	} else {
		return children
	}
}
export default ProtectedRoute
