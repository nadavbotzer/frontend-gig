import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import Carousel from 'better-react-carousel'

export function GigPreview({ gig }) {
    return <article className="preview">
        <div className="img-wrapper">
            <Carousel className="carousel" cols={1} rows={1} gap={10} loop showDots>
                <Carousel.Item className="carousel-item">
                    <img src={gig.imgUrls[0]} />
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <img src={gig.imgUrls[0]} />
                </Carousel.Item >
                <Carousel.Item className="carousel-item">
                    <img src={gig.imgUrls[0]} />
                </Carousel.Item>
            </Carousel>
            <button className="like-btn"><FavoriteBorderIcon /></button>
        </div>
        <div className="gig-user-preview">
            <img className="gig-user-img" src={gig.owner.imgUrl} />
            <span>Ad by </span>
            <span className="gig-user-fullname"> {gig.owner.fullname}</span>
        </div>
        <Link className="gig-title" to="/">{gig.title}</Link>
        <div className="gig-rating-preview">
            <span><StarIcon /></span>
            <span >4.9 </span>
            <span className="gig-previews-count">({gig.reviews.length})</span>
        </div>
        <p className="gig-price">From {gig.price}$</p>
    </article>
}