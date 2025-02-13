import { useSelector } from 'react-redux'

export function AppFooter() {
	const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			<div className='logo'>TopGig<span>.</span></div>
			<p> © Fiverr International Ltd. 2025</p>



			<a href='https://www.tiktok.com/@fiverr'>tiktok</a>
		</footer>
	)
}