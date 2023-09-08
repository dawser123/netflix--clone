import { useState } from 'react'
import Modal from '../components/UI/Modal'
import { useForm } from 'react-hook-form'
const Contact = () => {
	const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	const [msgIsSent, setMsgIsSent] = useState(false)
	useState(false)

	const onSubmit = () => {
		reset()
		setMsgIsSent(true)
	}
	return (
		<>
			<div className="w-full h-full">
				<div className="fixed w-full py-[96px] ">
					<h1 className="text-white text-center text-4xl font-bold my-5">Contact us</h1>
					<div className=" px-10   text-white">
						<div className="xsm:max-w-[500px] mx-auto py-14">
							<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center ">
								<input
									className="w-full px-3 py-3 mb-5 rounded bg-gray-600/75"
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
								{errors.email && <p className="text-red-400 font-bold mb-5">{errors.email.message}</p>}

								<textarea
									placeholder="Message"
									className="w-full min-h-[250px] max-h-[250px] p-3 bg-gray-600/75 
									
									"
									{...register('textarea', {
										required: 'Fill the message area.',
										minLength: { value: 10, message: 'Message must contain at least 10 characters.' },
									})}></textarea>
								{errors.textarea && <p className="text-red-400 font-bold m-3">{errors.textarea.message}</p>}

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
							backgroundModal="bg-green-800"
							onClose={() => setMsgIsSent(false)}>
							<button
								onClick={() => setMsgIsSent(false)}
								className="mt-4 mx-auto p-2 w-[40%] bg-green-400 rounded hover:delay-150 hover:bg-green-500">
								ok
							</button>
						</Modal>
					)}
				</div>
			</div>
		</>
	)
}
export default Contact
