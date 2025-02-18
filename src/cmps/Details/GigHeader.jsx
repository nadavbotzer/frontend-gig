import { MiniUser } from "../MiniUser/MiniUser.jsx";

export function GigHeader({ title, owner, reviewsCount }) {
    return <div className="header">
        <h1 className='gig-title'>{title}</h1>
        <MiniUser
            owner={owner}
            reviewsCount={reviewsCount}
        />
    </div>
}