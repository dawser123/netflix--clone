import { Link, useNavigate } from 'react-router-dom'
import AuthContext from './store/AuthContext'
import { useContext, useState } from 'react'
const Navbar = () => {
	const [error, setError] = useState()
	const navigate = useNavigate()
	const ctx = useContext(AuthContext)
	const handleLogOut = async () => {
		try {
			await ctx.logOut()
			navigate('/')
		} catch (error) {
			setError('Something went wrong')
		}
	}
	return (
		<div className="absolute w-full flex items-center justify-between px-4 py-6 z-10 ">
			<h1 className="text-red-600 text-3xl sm:text-5xl  font-bold cursor-pointer">
				<Link to="/">Netflix</Link>
			</h1>
			<p className="text-white font-bold">{error}</p>
			{ctx.user?.email ? (
				<div className="text-white flex ">
					<button className="pr-4 ">
						<Link to="/account">My account</Link>
					</button>
					<button
						onClick={handleLogOut}
						className="bg-red-600 px-6 py-2 rounded-lg transition duration-300 hover:bg-red-800">
						Logout
					</button>
				</div>
			) : (
				<div className="text-white flex ">
					<button className="pr-4 ">
						<Link to="/login">Log in</Link>
					</button>
					<button className="bg-red-600 px-6 py-2 rounded-lg transition duration-300 hover:bg-red-800">
						<Link to="/signup">Sign Up</Link>
					</button>
				</div>
			)}
		</div>
	)
}
export default Navbar
