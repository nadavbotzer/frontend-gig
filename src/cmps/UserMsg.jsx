import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export function UserMsg() {
	const [msg, setMsg] = useState(null)
	const timeoutIdRef = useRef()

	useEffect(() => {
		const unsubscribe = eventBus.on('show-msg', msg => {
			setMsg(msg)
			if (timeoutIdRef.current) {
				timeoutIdRef.current = null
				clearTimeout(timeoutIdRef.current)
			}
			timeoutIdRef.current = setTimeout(closeMsg, 6000)
		})

		// socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
		// 	showSuccessMsg(`New review about me ${review.txt}`)
		// })

		return () => {
			unsubscribe()
			clearTimeout(timeoutIdRef.current)
		}
	}, [])

	function closeMsg() {
		setMsg(null)
	}

	function msgClass() {
		return msg ? 'visible' : ''
	}

	function getMessageIcon() {
		if (!msg) return null
		
		// Check message content for specific contexts
		const messageText = msg.txt.toLowerCase()
		
		if (msg.type === 'success') {
			if (messageText.includes('welcome back') || messageText.includes('login')) {
				return <LoginIcon className="msg-icon" />
			}
			if (messageText.includes('welcome to') || messageText.includes('signup') || messageText.includes('join')) {
				return <PersonAddIcon className="msg-icon" />
			}
			return <CheckCircleIcon className="msg-icon" />
		}
		
		if (msg.type === 'error') {
			return <ErrorIcon className="msg-icon" />
		}
		
		return null
	}

	return (
		<section className={`user-msg ${msg?.type} ${msgClass()}`}>
			{getMessageIcon()}
			<span className="msg-text">{msg?.txt}</span>
			<button onClick={closeMsg}>x</button>
		</section>
	)
}
