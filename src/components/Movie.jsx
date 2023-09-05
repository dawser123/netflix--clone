import { useState, useContext } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import AuthContext from './store/AuthContext'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import Modal from './Modal'
import { db } from '../firebase'
const Movie = ({ item }) => {
	const ctx = useContext(AuthContext)
	const [like, setLike] = useState(false)
	const [error, seError] = useState(false)
	const movieId = doc(db, 'users', `${ctx.user?.email}`)
	const saveMovie = async () => {
		if (ctx.user?.email) {
			setLike(true)
			await updateDoc(movieId, {
				savedMovie: arrayUnion({
					id: item.id,
					title: item.title,
					img: item.backdrop_path,
				}),
			})
		} else {
			seError(true)
		}
	}

	return (
		<>
			<Modal
				title="Log in to save a movie!"
				isOpen={error}
				backgroundBtn="bg-red-400"
				backgroundBtnHover="bg-red-500"
				backgroundModal="bg-red-800"
				onClose={() => seError(false)}></Modal>
			<div className="w-[160px] xsm:w-[200px]  cursor-pointer inline-block relative p-1">
				<img
					className="w-full h-auto block"
					id={item.id}
					src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
					alt={item?.title}
				/>
				<div className="absolute left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 top-0 ">
					<p className="text-sm xsm:text-base px-3 h-full  text-white flex items-center justify-center text-center whitespace-normal">
						{item?.title}
					</p>

					<p onClick={saveMovie}>
						{like ? (
							<FaHeart className="text-white absolute top-2  right-2" />
						) : (
							<FaRegHeart className="text-white absolute top-2  right-2" />
						)}
					</p>
				</div>
			</div>
		</>
	)
}

export default Movie
