import requests from '../Requests'
import MainLayout from '../components/MainLayout'
import MovieRow from '../components/MovieRow'
const Home = () => {
	return (
		<>
			<MainLayout />
			<MovieRow rowID='1' title="Popular" fetchURL={requests.requestPopular} />
			<MovieRow rowID='2' title="Up Coming" fetchURL={requests.requestUpcoming} />
		</>
	)
}
export default Home
