import { Link } from 'react-router-dom'

export function JoinFiverr() {
    return (
        <div className='join-fiverr'>
            <h1>Freelance services at your <span>fingertips</span></h1>
            <div className='join-btn'>
                <Link to="login" className="link btn ">Join Fiverr</Link>
            </div>
        </div>
    )
}