import { useContext, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import AuthContext from './store/AuthContext'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
const SavedMovie = () => {
	const ctx = useContext(AuthContext)
	const [movies, setMovies] = useState([])
	const [error, setError] = useState()
	const movieRef = doc(db, 'users', `${ctx.user?.email}`)
	const deleteMovieHandler = async movieId => {
		try {
			const result = movies.filter(item => item.id !== movieId)
			await updateDoc(movieRef, {
				savedMovie: result,
			})
		} catch (error) {
			setError('Something went wrong')
		}
	}
	useEffect(() => {
		onSnapshot(doc(db, 'users', `${ctx.user?.email}`), doc => {
			setMovies(doc.data()?.savedMovie)
		})
	}, [ctx.user?.email])
	return (
		<>
			{error ? (
				<p className="text-white text-center text-xl">Loading movies ...</p>
			) : (
				<div className="relative ">
					<div className=" flex items-center justify-center flex-row relative flex-wrap gap-7">
						{movies.map((item, id) => (
							<div
								key={id}
								className="w-[180px] sm:w-[200px] xsm:w-[240px]  cursor-pointer inline-block relative p-1 hover:scale-125">
								<div className="relative">
									<img id={item.id} src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
									<div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 transition duration-200 ease-in-out ">
										<p className="text-sm xsm:text-base px-3 h-full  text-white flex items-center justify-center text-center whitespace-normal">
											{item?.title}
										</p>
										<p
											onClick={() => deleteMovieHandler(item.id)}
											className="absolute text-gray-100  top-2 left-2 hover:text-gray-400 hover:delay-100 ">
											<AiOutlineClose size={18} />
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}
export default SavedMovie
