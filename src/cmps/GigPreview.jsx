import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { ImgCarousel } from './ImgCarousel';

export function GigPreview({ gig, goToDetails }) {
    return <article className="preview">
        <div className="img-wrapper">
            <ImgCarousel imgUrls={gig.imgUrls} onClickImg={goToDetails} />

            <button className="like-btn"><FavoriteBorderIcon /></button>
        </div>
        <div className="gig-user-preview">
            <img className="gig-user-img" src={gig.owner.imgUrl} />
            {gig.promoted && <span>Ad by </span>}
            <span className="gig-user-fullname"> {gig.owner.fullname}</span>
        </div>
        <Link className="gig-title" to={`/gig/${gig._id}`}>{gig.title}</Link>
        <div className="gig-rating-preview">
            <span><StarIcon /></span>
            <span >4.9 </span>
            <span className="gig-previews-count">({gig.reviews.length})</span>
        </div>
        <p className="gig-price">From USD${gig.price}</p>
    </article>
}