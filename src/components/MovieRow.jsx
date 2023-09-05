import { useEffect, useState } from 'react'
import axios from 'axios'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Movie from './Movie'
const MovieRow = ({ title, fetchURL, rowID }) => {
	const [movies, setMovies] = useState([])
	useEffect(() => {
		axios.get(fetchURL).then(response => {
			setMovies(response.data.results)
		})
	}, [fetchURL])
	const sliceRight = () => {
		const slice = document.getElementById('slice' + rowID)
		slice.scrollLeft = slice.scrollLeft - 500
	}
	const sliceLeft = () => {
		const slice = document.getElementById('slice' + rowID)
		slice.scrollLeft = slice.scrollLeft + 500
	}
	return (
		<div>
			<h2 className="text-white font-bold p-3 xsm:text-3xl">{title}</h2>
			<div className="relative flex items-center group">
				<MdOutlineKeyboardArrowLeft
					onClick={sliceRight}
					className="bg-white rounded-full  absolute cursor-pointer left-0 z-10 opacity-60 hidden group-hover:block "
					size={30}
				/>
				<div className=" relative overflow-x-scroll whitespace-nowrap scrollbar-none" id={'slice' + rowID}>
					{movies.map((item, id) => (
						<Movie item={item} key={id} />
					))}
				</div>
				<MdOutlineKeyboardArrowRight
					onClick={sliceLeft}
					className="bg-white rounded-full absolute cursor-pointer right-0  z-100 opacity-60 hidden group-hover:block "
					size={30}
				/>
			</div>
		</div>
	)
}
export default MovieRow
