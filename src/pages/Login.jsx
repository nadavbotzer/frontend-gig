import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'
import { LoadingSpinner } from '../cmps/LoadingSpinner'

export function Login() {
    const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers()
            setUsers(users)
        } catch (err) {
            console.error('Failed to load users:', err)
        }
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return

        setIsLoading(true)
        try {
            await login(credentials)
            navigate('/')
        } catch (err) {
            console.error('Login failed:', err)
            alert('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    return (
        <form className="auth-form" onSubmit={onLogin}>
            <div className="form-group">
                <select
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user._id} value={user.username}>
                            {user.fullname}
                        </option>
                    ))}
                </select>
            </div>

            <button 
                type="submit" 
                className="auth-btn"
                disabled={isLoading}
            >
                {isLoading ? (
                    <LoadingSpinner message="" size="small" />
                ) : (
                    'Sign In'
                )}
            </button>
        </form>
    )
}