import React from 'react'
import useModal from '../customHooks/useModal'
import { useEffect, useState, useRef } from 'react'

import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { useScrollContext } from './ScrollProvider'
import { DropDown } from './DropDown'
import { SearchBar } from './SearchBar'

// MUI Icons
import PersonIcon from '@mui/icons-material/Person'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import LogoutIcon from '@mui/icons-material/Logout'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'



export function AppHeader() {

	const [isOpen, toggleModal] = useModal()
	const btnRef = useRef(null)
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const { isInputVisible, setIsInputVisible } = useScrollContext()

	const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
	const inputRef = useRef(null)
	const headerRef = useRef(null)



	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		document.documentElement.style.setProperty('--header-height', headerRef.current.offsetHeight + 'px')

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
			showSuccessMsg(`Logout`)
			toggleModal()

		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header ref={headerRef} className="app-header full main-container">
			<nav>
				<div className="logo">
					<NavLink to="/" className="logo">
						TopGig<span>.</span>
					</NavLink>
				</div>

				{!isInputVisible &&
					<form className='search-input'>
						<SearchBar placeholder={'what service are you looking for today?'} isBtnInline={false} ref={inputRef.current} />
					</form>}
				<div className='nav-links'>
					{user?.isAdmin && (
						<NavLink to="/admin" className="admin-link">
							<AdminPanelSettingsIcon className="nav-icon" />
							Admin
						</NavLink>
					)}
					{!user && <NavLink to="login" className="link">Sign in</NavLink>}
					{!user && <NavLink to="login" className="link btn-join">Join</NavLink>}
					{user && (
						<div className="user-info">
							<button ref={btnRef} className=' user-img' onClick={toggleModal}>{user.imgUrl && <img src={user.imgUrl} />}</button>
							<DropDown buttonRef={btnRef} isOpen={isOpen} toggleModal={toggleModal} className="user-option-dropdown">
								<DropDown.Header>
									<div className="user-header-info">
										<div className="user-avatar">
											{user.imgUrl ? (
												<img src={user.imgUrl} alt={user.fullname} />
											) : (
												<div className="avatar-placeholder">
													{user.fullname?.charAt(0)?.toUpperCase()}
												</div>
											)}
										</div>
										<div className="user-details">
											<div className="user-name">{user.fullname}</div>
											<div className="user-username">@{user.username || user.fullname?.toLowerCase().replace(' ', '')}</div>
										</div>
									</div>
								</DropDown.Header>
								<DropDown.Content>
									<div className="user-actions">
										<Link className="action-item" to={`/user/${user._id}`} onClick={toggleModal}>
											<PersonIcon className="action-icon" />
											Profile
										</Link>
										<Link className="action-item" to="/dashboard" onClick={toggleModal}>
											<DashboardIcon className="action-icon" />
											Dashboard
										</Link>
										<Link className="action-item" to="/orders" onClick={toggleModal}>
											<ShoppingBagIcon className="action-icon" />
											My Orders
										</Link>
										<div className='logout-btn action-item' onClick={onLogout}>
											<LogoutIcon className="action-icon" />
											Logout
										</div>
									</div>
								</DropDown.Content>
							</DropDown>
						</div>
					)}
				</div>
			</nav>

		</header>
	)
}
