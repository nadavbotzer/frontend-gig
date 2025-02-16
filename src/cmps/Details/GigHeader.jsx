import { MiniUser } from "../MiniUser/MiniUser.jsx";

export function GigHeader({ gig, title }) {
    return <div className="header">
        <h1 className='gig-title'>{title}</h1>
        <MiniUser />
    </div>
}