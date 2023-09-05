
import SavedMovie from '../components/SavedMovie'
const Account = () => {
	return (
		<>
			<div className="w-full h-screen ">
				<img
					className="text-white w-full h-full object-cover"
					src={
						'https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d04f9f62-27ac-446b-ae36-7d12c257f560/NO-nb-20230814-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
					}
					alt="Netflix image background"
				/>
				<div className="bg-black opacity-[80%] fixed top-0 left-0 w-full h-screen"></div>
				<div className="absolute top-[20%] w-full ">
					<h1 className="text-white font-bold text-2xl xsm:text-4xl text-center mb-10">My Movies</h1>
					<SavedMovie />
				</div>
			</div>
		</>
	)
}
export default Account
