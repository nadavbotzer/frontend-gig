import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    return <article className="preview">
        <header>
            <Link to={`/gig/${gig._id}`}>{gig.title}</Link>
        </header>

        <p>Price: <span>{gig.price.toLocaleString()}$</span></p>
        {gig.owner && <p>Owner: <span>{gig.owner.fullname}</span></p>}

    </article>
}