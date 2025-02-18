import React from 'react'
import useModal from '../customHooks/useModal'
import { useEffect, useState, useRef } from 'react'

import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { useScrollContext } from './ScrollProvider'
import { DropDown } from './DropDown'
import { SearchBar } from './SearchBar'



export function AppHeader() {

	const [isOpen, toggleModal] = useModal()
	const btnRef = useRef(null)
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const { isInputVisible, setIsInputVisible } = useScrollContext()

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

				{!isInputVisible &&
					<div className='search-input'>
						<SearchBar placeholder={'what service are you looking for today?'} isBtnInline={false} ref={inputRef} />
					</div>}
				<div className='nav-links'>

					{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

					{!user && <NavLink to="login" className="link">Sign in</NavLink>}

					{!user && <NavLink to="login" className="link btn-join">Join</NavLink>}

					{user && (
						<div className="user-info">
							<button ref={btnRef} className=' user-img' onClick={toggleModal}>{user.imgUrl && <img src={user.imgUrl} />}</button>

							<DropDown buttonRef={btnRef} isOpen={isOpen} toggleModal={toggleModal}>
								<button className='btn-Logout' onClick={onLogout}>Logout</button>
							</DropDown>
						</div>
					)}
				</div>
			</nav>
		</header>
	)
}
