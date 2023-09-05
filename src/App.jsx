import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './components/store/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/LogIn'
import Contact from './pages/Contact'
import Account from './pages/Account'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
	return (
		<>
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/account"
						element={
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>
						}
					/>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</AuthContextProvider>
		</>
	)
}
export default App