import React from 'react'
import { useEffect, useState, useRef } from 'react'

import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { GigSearch } from './GigSearch'
import { useScrollContext } from './ScrollProvider'


export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const { isInputInView, isInputVisible, setIsInputVisible } = useScrollContext()

	const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
	const inputRef = useRef(null)

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	function handleScroll() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		const inputElement = inputRef.current
		const inputInView = inputElement && inputElement.getBoundingClientRect().top <= window.innerHeight

		if (scrollTop === 0) {
			setIsInputVisible(false)
			setIsHeaderScrolled(false)
		} else if (inputInView) {
			setIsInputVisible(true)
			setIsHeaderScrolled(true)
		} else {
			setIsInputVisible(false)
		}
	}


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

				{!isInputVisible && <GigSearch ref={inputRef} />}
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
