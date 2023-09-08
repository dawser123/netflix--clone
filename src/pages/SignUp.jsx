import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../components/store/AuthContext'
import { useForm } from 'react-hook-form'
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth'

const SignUp = () => {
	const ctx = useContext(AuthContext)
	const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	const navigate = useNavigate()
	const [error, setError] = useState(false)
	const [emailError, setEmailError] = useState('')
	const {register,handleSubmit,formState: {errors},} = useForm()

	const onSubmit = async data => {
		const auth = getAuth()
		try {
			const methods = await fetchSignInMethodsForEmail(auth, data.email)
			if (methods && methods.length > 0) {
				setEmailError('Email address is already in use.')
				return
			}
			await ctx.signUp(data.email, data.password)
			navigate('/')
		} catch (error) {
			setError(error.message)
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
						<div className="xsm:max-w-[320px] mx-auto py-">
							<h1 className="font-bold text-2xl mb-7 xsm:py-10 xsm:text-3xl ">Sign Up</h1>
							<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col justify-center items-center ">
								<input
									className="w-full px-3 py-3 rounded bg-gray-600/75"
									type="email"
									placeholder="Email address"
									autoComplete="email"
									{...register('email', {
										required: 'Enter valid email',
										pattern: {
											value: validateEmail,
											message: 'Enter valid email and try again.',
										},
									})}
								/>
								{errors.email && <p className="text-red-400 font-bold my-2">{errors.email.message}</p>}
								{emailError && <p className="text-red-400 font-bold my-2">{emailError}</p>}
								<input
									className="w-full px-3 py-3 my-5 rounded bg-gray-600/75"
									type="password"
									placeholder="Password"
									{...register('password', {
										required: 'Password must be at least 6 characters long',
										minLength: { value: 6, message: 'Password must be at least 6 characters long' },
									})}
								/>
								{errors.password && (
									<p className="text-red-400 text-center font-bold my-2">{errors.password.message}</p>
								)}
								{error && <p className="text-red-400 font-bold ">{error}</p>}
								<button
									type="submit"
									className="bg-red-600 px-6 py-3 rounded transition duration-300 hover:bg-red-800 w-full my-10 font-bold">
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
