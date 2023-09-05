import { useState } from 'react'
import Modal from '../components/Modal'
const Contact = () => {
	const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	const [enteredMsg, setEnteredMsg] = useState('')
	const [enteredEmail, setEnteredEmail] = useState('')
	const [msgIsSent, setMsgIsSent] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [msgError, setMsgError] = useState(false)
	const textHandler = event => {
		setEnteredMsg(event.target.value)
		setMsgError(false)
	}
	const emailHandler = event => {
		setEnteredEmail(event.target.value)
		setEmailError(false)
	}
	const submitHandler = event => {
		event.preventDefault()
		if (enteredEmail.trim().length === 0 || !validateEmail.test(enteredEmail)) {
			setEmailError(true)
			if (enteredMsg.trim().length === 0) {
				setMsgError(true)
			} else {
				setMsgError(false)
			}
		} else if (enteredMsg.trim().length === 0) {
			setMsgError(true)
		} else {
			setMsgIsSent(true)
			setEmailError(false)
			setMsgError(false)
			setEnteredEmail('')
			setEnteredMsg('')
		}
	}
	return (
		<>
			<div className="w-full h-full">
				<div className="fixed w-full py-[96px] ">
					<h1 className="text-white text-center text-4xl font-bold my-5">Contact us</h1>
					<div className=" px-10   text-white">
						<div className="xsm:max-w-[500px] mx-auto py-14">
							<form onSubmit={submitHandler} className="flex flex-col justify-center items-center ">
								<input
									value={enteredEmail}
									onChange={emailHandler}
									className="w-full px-3 py-3 mb-5 rounded bg-gray-600/75"
									type="email"
									placeholder="Email address"
									autoComplete="email"
								/>
								{emailError && <p className="text-red-400 font-bold mb-4">Enter valid email and try again</p>}
								<textarea
									value={enteredMsg}
									onChange={textHandler}
									placeholder="Message"
									className="w-full min-h-[250px] max-h-[250px] p-3 bg-gray-600/75 "></textarea>
								{msgError && <p className="text-red-400 font-bold my-5 ">Fill the message area.</p>}
								<button className="bg-red-600 px-6 py-3 rounded transition duration-300 hover:bg-red-800 w-full my-5 font-bold">
									Send
								</button>
								<p className="text-right w-full hover:underline"></p>
							</form>
						</div>
					</div>
					{msgIsSent && (
						<Modal
							title="Your message was sent successfully!"
							isOpen={msgIsSent}
							backgroundBtn="bg-green-400"
							backgroundBtnHover="bg-green-500"
							backgroundModal="bg-green-800"
							onClose={() => setMsgIsSent(false)}></Modal>
					)}
				</div>
			</div>
		</>
	)
}
export default Contact
