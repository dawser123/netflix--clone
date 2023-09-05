import { useEffect, useState } from 'react'
import requests from '../Requests'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../components/store/AuthContext'
import { useNavigate } from 'react-router-dom'
const MainLayout = () => {
	const [movies, setMovies] = useState([])
	const [enteredEmail, setEnteredEmail] = useState('')
	const [emailIsValid, setEmailIsValid] = useState(true)
	const navigate = useNavigate()
	const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	const movie = movies[Math.floor(Math.random() * movies.length)]
	const ctx = useContext(AuthContext)
	useEffect(() => {
		axios.get(requests.requestPopular).then(response => {
			setMovies(response.data.results)
		})
	}, [])
	const emailChangeHandler = event => {
		setEnteredEmail(event.target.value)
	}
	const submitHandler = event => {
		event.preventDefault()
		if (enteredEmail.trim().length === 0 || !validateEmail.test(enteredEmail)) {
			setEmailIsValid(false)
			return
		} else {
			setEmailIsValid(true)
			setEnteredEmail('')
			navigate('/signup')
		}
	}
	return (
		<div className="relative w-full h-[350px] sm:h-[550px] text-white">
			<div className="w-full h-full ">
				<div className="absolute w-full h-[550px] bg-black opacity-[75%]"></div>
				<img
					className="w-full h-full object-cover  "
					src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
					alt={movie?.title}
				/>
				<div className="absolute w-full top-[28%] sm:top-[35%] text-center px-5">
					<h1 className="sm:my-3 font-bold text-2xl  sm:text-3xl">Unlimited films</h1>
					<p className="my-1 text-m xsm:text-xl ">Watch anywhere.</p>
					<p className="xsm:text-xl mb-3">Ready to watch? Enter your email to create your membership.</p>
					{!ctx.user?.email && (
						<form onSubmit={submitHandler} className="flex justify-center items-center flex-col xsm:flex-row  ">
							<input
								onChange={emailChangeHandler}
								className="p-2 sm:p-3 sm:my-5 bg-black rounded w-full xsm:max-w-[30%] text-white placeholder:text-white bg-opacity-[60%]"
								type="email"
								placeholder="Email adress"
							/>
							{!emailIsValid && <p className=" font-bold text-s text-red-400 xsm:hidden">Enter valid email </p>}
							<button className=" xsm:ml-2 px-3 py-2 sm:px-6 sm:my-4 sm:py-3 mt-2 rounded bg-red-600 font-bold transition duration-300 hover:bg-red-800">
								Get Started
							</button>
						</form>
					)}
					{!emailIsValid && <p className=" hidden font-bold text-red-400 xsm:block">Enter valid email </p>}
				</div>
			</div>
		</div>
	)
}
export default MainLayout
