import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../components/store/AuthContext'

const SignUp = () => {
	const ctx = useContext(AuthContext)
	const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

	const [enteredEmail, setEnteredEmail] = useState('')
	const [enteredPassword, setEnteredPassword] = useState('')

	const [error, setError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const navigate = useNavigate()
	const emailHandler = event => {
		setEnteredEmail(event.target.value)
	}
	const passwordHandler = event => {
		setEnteredPassword(event.target.value)
	}
	const handleSubmit = async event => {
		event.preventDefault()
		try {
			await ctx.signUp(enteredEmail, enteredPassword)
			navigate('/')
		} catch (error) {
			console.log(error);
			setError('Enter valid data and try again.')
		}
		if (enteredEmail.trim().length === 0 || !validateEmail.test(enteredEmail)) {
			setEmailError(true)
			if (enteredPassword.trim().length <= 5) {
				setPasswordError(true)
			} else {
				setPasswordError(false)
			}
		} else if (enteredPassword.trim().length <= 5) {
			setPasswordError(true)
		} else {
			setPasswordError(false)
			setEmailError(false)
		}
	}
	return (
		<>
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
							<h1 className="font-bold text-2xl mb-7 xsm:py-10 xsm:text-3xl ">Sign Up</h1>
							<form onSubmit={handleSubmit} className="flex flex-col justify-center items-center ">
								<input
									onChange={emailHandler}
									className="w-full px-3 py-3 rounded bg-gray-600/75"
									type="email"
									placeholder="Email address"
									autoComplete="email"
									value={enteredEmail}
								/>
								{emailError && <p className="text-red-400 font-bold my-2">Enter valid email</p>}
								<input
									onChange={passwordHandler}
									className="w-full px-3 py-3 my-5 rounded bg-gray-600/75"
									type="password"
									placeholder="Password"
									value={enteredPassword}
								/>
								{error && <p className="text-red-400 font-bold ">{error}</p>}
								{passwordError && <p className='text-red-400 font-bold'>Password must be longer than 5 characters. </p>}
								

								<button className="bg-red-600 px-6 py-3 rounded transition duration-300 hover:bg-red-800 w-full my-10 font-bold">
									Sign Up
								</button>
								<p className="text-right w-full hover:underline">
									<Link to="/contact">Need help?</Link>
								</p>
							</form>
							<p className="text-gray-500 py-4">
								If you already have an account,
								<Link className="font-bold cursor-pointer text-white pl-1 hover:underline" to="/login">
									Log In
								</Link>
								.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUp
