import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { GigSearch } from './GigSearch'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full main-container">
			<nav>
				<div className="logo">
					<NavLink to="/" className="logo">
						TopGig<span>.</span>
					</NavLink>
				</div>
				<GigSearch />
				<div className='nav-links'>
					{/* 
					<NavLink to="about">About</NavLink>
					<NavLink to="gig">gigs</NavLink> */}
					{/* <NavLink to="chat">Chat</NavLink> */}
					{/* <NavLink to="review">Review</NavLink> */}

					{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

					{!user && <NavLink to="login" className="link">Sign in</NavLink>}

					{!user && <NavLink to="login" className="link btn-join">Join</NavLink>}

					{user && (
						<div className="user-info">
							{/* <Link to={`user/${user._id}`}> */}
							{/* {user.imgUrl && <img src={user.imgUrl} />} */}
							{/* {user.fullname} */}
							{/* </Link> */}
							{/* <span className="score">{user.score?.toLocaleString()}</span> */}
							<button className=' user-img' onClick={onLogout}>{user.imgUrl && <img src={user.imgUrl} />}</button>
						</div>
					)}
				</div>
			</nav>

		</header>
	)
}
