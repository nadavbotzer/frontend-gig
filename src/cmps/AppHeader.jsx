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



export function AppHeader() {

	const [isOpen, toggleModal] = useModal()
	const btnRef = useRef(null)
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const { isInputVisible, setIsInputVisible } = useScrollContext()

	const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
	const inputRef = useRef(null)

	const tags = [
		{ txt: 'Programming & Tech', tags: ['programming', 'tech'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech-thin.56382a2.svg' },
		{ txt: 'Graphics & Design', tags: ['graphics', 'design'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design-thin.ff38893.svg' },
		{ txt: 'Digital Marketing', tags: ['digital-marketing'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing-thin.68edb44.svg' },
		{ txt: 'Writing & Translation', tags: ['writing', 'translation'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation-thin.fd3699b.svg' },
		{ txt: 'Video & Animation', tags: ['video', 'animation'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation-thin.9d3f24d.svg' },
		{ txt: 'AI Services', tags: ['ai-services'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services-thin.104f389.svg' },
		{ txt: 'Music & Audio', tags: ['music', 'audio'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio-thin.43a9801.svg' },
		{ txt: 'Business', tags: ['business'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business-thin.885e68e.svg' },
		{ txt: 'Consultin', tags: ['consultin'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting-thin.d5547ff.svg' },
	]

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
			toggleModal()

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
						<SearchBar isBtnInline={false} ref={inputRef} />
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
			<div className='tags-wrapper main-container full'>
				<div className='tags main-layout'>
					{tags.map(((tag, idx) => {
						return (
							<Link key={idx} className="tag" to={`/gig/?tags=${tag.tags}`}>{tag.txt}</Link>
						)
					}))}
				</div>
			</div>

		</header>
	)
}
