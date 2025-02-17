import { useSelector } from 'react-redux'

export function AppFooter() {
	const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="main-container app-footer ">
			<div className='footer-content'>
				<div className='logo'>TopGig<span>.</span></div>
				<p> ©Bar Rabinovitz - Nadav Botzer - Tamar Levy 2025</p>
			</div>



			{/* <a href='https://www.tiktok.com/@fiverr'>tiktok</a> */}
		</footer>
	)
}