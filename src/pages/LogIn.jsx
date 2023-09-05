import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../components/store/AuthContext'

const Login = () => {
	const ctx = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)
	const navigate = useNavigate()
	const emailHandler = event => {
		setEmail(event.target.value)
	}
	const passwordHandler = event => {
		setPassword(event.target.value)
	}
	const handleLogIn = async event => {
		event.preventDefault()
		try {
			await ctx.logIn(email, password)
			navigate('/')
		} catch (error) {
			setError('Enter valid data and try again.')
		}
	}
	return (
		<div className="w-full h-screen">
			<img
				className="text-white hidden xsm:block absolute w-full h-full object-cover"
				src={
					'https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d04f9f62-27ac-446b-ae36-7d12c257f560/NO-nb-20230814-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
				}
				alt="Netflix image background"
			/>
			<div className="absolute w-full h-full bg-black opacity-[60%]"></div>
			<div className="fixed w-full py-[96px] ">
				<div
					className=" px-10 xsm:max-w-[450px] h-[600px] mx-auto bg-black/75
                text-white">
					<div className="xsm:max-w-[320px] mx-auto py-14">
						<h1 className="font-bold text-2xl mb-7 xsm:py-10 xsm:text-3xl ">Log in</h1>
						<form onSubmit={handleLogIn} className="flex flex-col justify-center items-center ">
							<input
								className="w-full px-3 py-3 mb-5 rounded  bg-gray-600/75 "
								type="email"
								placeholder="Email address"
								autoComplete="email"
								onChange={emailHandler}
							/>
							<input
								onChange={passwordHandler}
								className="w-full px-3 py-3 rounded bg-gray-600/75"
								type="password"
								placeholder="Password"
							/>
							{error && <p className="text-red-400 font-bold my-2">{error}</p>}
							<button className="bg-red-600 px-6 py-3 rounded transition duration-300 hover:bg-red-800 w-full my-10 font-bold">
								Log In
							</button>
							<p className="text-right w-full hover:underline">
								<Link to="/contact">Need help?</Link>
							</p>
						</form>
						<p className="text-gray-500 py-4 ">
							New to Netflix?
							<Link className="font-bold cursor-pointer pl-1 text-white hover:underline" to="/signup">
								Sign up now
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
