import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { RadioItem } from '../cmps/RadioItem'
import { LoadingSpinner } from '../cmps/LoadingSpinner'

export function LoginSignup() {
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === '/login'
    const [isLoading, setIsLoading] = useState(true)
    
    const authOptions = [
        { value: 'login', label: 'Sign In' },
        { value: 'signup', label: 'Join' }
    ]

    useEffect(() => {
        // Simulate loading time for better UX
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)
        
        return () => clearTimeout(timer)
    }, [])

    function handleAuthTypeChange(ev) {
        const selectedType = ev.target.value
        if (selectedType === 'login') {
            navigate('/login')
        } else {
            navigate('/login/signup')
        }
    }

    if (isLoading) {
        return (
            <div className="login-page">
                <div className="auth-container">
                    <LoadingSpinner message="Loading..." fullPage={false} />
                </div>
            </div>
        )
    }

    return (
        <div className="login-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Welcome to TopGig<span>.</span></h1>
                    <p>{isLogin ? 'Sign in to your account' : 'Join our community of talented freelancers'}</p>
                </div>

                <div className="auth-type-selector">
                    <div className="radio-list">
                        {authOptions.map(option => (
                            <RadioItem
                                key={option.value}
                                name="authType"
                                option={option}
                                value={isLogin ? 'login' : 'signup'}
                                onChange={handleAuthTypeChange}
                            />
                        ))}
                    </div>
                </div>

                <div className="auth-form-container">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}