import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    return <article className="preview">
        <div className="img-wrapper">
            <img className="gig-img" src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg" />
            <button className="like-btn">♥</button>
        </div>
        <div className="gig-user-preview">
            <img className="gig-user-img" src="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/cd31f79fed09551339b09021a70d8410-822829131706273548.198258/7D61D8A3-9D5F-429B-B605-952B732977CC" />
            <span>Ad by </span>
            <span >{gig.owner.fullname}</span>
        </div>
        <Link className="gig-title" to="/">{gig.title}</Link>
        <div className="gig-rating-preview">
            <span>⭐</span>
            <span>4.9 </span>
            <span>({gig.reviews.length})</span>
        </div>
        <p className="gig-price">From {gig.price}$</p>
    </article>
}