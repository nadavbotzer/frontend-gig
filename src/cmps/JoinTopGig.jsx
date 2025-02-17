import { Link } from 'react-router-dom'

export function JoinTopGig() {
    return (
        <div className='join-topgig'>
            <h1>Freelance services at your <span>fingertips</span></h1>
            <div className='join-btn'>
                <Link to="login" className="link btn ">Join TopGig</Link>
            </div>
        </div>
    )
}