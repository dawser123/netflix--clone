import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ isOpen, onClose, title, backgroundModal, backgroundBtn, backgroundBtnHover }) => {
	if (!isOpen) return null
	const Backdrop = () => {
		return <div className="fixed top-0 left-0 w-full h-screen z-30 bg-black/75" onClick={onClose}></div>
	}
	const ModalOverlay = () => {
		return (
			<>
				<div
					className={`fixed w-[320px] h-[180px] top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded ${backgroundModal} z-50`}>
					<div className="text-white flex justify-center items-center flex-col h-full">
						<p className="text-lg">{title}</p>
						<button
							onClick={onClose}
							className={`mt-4 mx-auto p-2 w-[40%] hover:${backgroundBtnHover} rounded ${backgroundBtn} hover:delay-150 `}>
							OK
						</button>
					</div>
				</div>
			</>
		)
	}

	return (
		<React.Fragment>
			{ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
			{ReactDOM.createPortal(<ModalOverlay />, document.getElementById('overlay-root'))}
		</React.Fragment>
	)
}
export default Modal
