import { NavLink } from 'react-router-dom'

export function JoinFiverr() {
    return (
        <div className='join-fiverr'>
            <h1>Freelance services at your <span>fingertips</span></h1>
            <div className='join-btn'>
                <NavLink to="login" className="link btn ">Join Fiverr</NavLink>

            </div>
        </div>
    )
}