import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signup } from '../store/actions/user.actions'
import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user'
import { LoadingSpinner } from '../cmps/LoadingSpinner'

export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    function clearState() {
        setCredentials(userService.getEmptyUser())
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password || !credentials.fullname) return

        setIsLoading(true)
        try {
            await signup(credentials)
            clearState()
            navigate('/')
        } catch (err) {
            console.error('Signup failed:', err)
            alert('Signup failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <form className="auth-form" onSubmit={onSignup}>
            <div className="form-group">
                <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <ImgUploader onUploaded={onUploaded} />
            </div>

            <button 
                type="submit" 
                className="auth-btn"
                disabled={isLoading}
            >
                {isLoading ? (
                    <LoadingSpinner message="" size="small" color="white" />
                ) : (
                    'Join TopGig'
                )}
            </button>
        </form>
    )
}