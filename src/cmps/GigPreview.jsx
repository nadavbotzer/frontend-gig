import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateGig } from '../store/actions/gig.actions'
import { userService } from '../services/user'
import { ImgCarousel } from '../cmps/ImgCarousel'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StarIcon from '@mui/icons-material/Star'

export function GigPreview({ gig, goToDetails }) {
    const dispatch = useDispatch()

    function onClickLike() {
        console.log('gig liked')

        const loggedInUser = userService.getLoggedinUser()
        if (!loggedInUser) return // Ensure the user is logged in

        // Clone the gig object and add the logged-in user to the likedByUsers array
        const updatedGig = {
            ...gig,
            likedByUsers: [...gig.likedByUsers, loggedInUser]  // Add the user to likedByUsers
        }

        // Dispatch the action to update the gig in the store
        dispatch(updateGig(updatedGig))  // Dispatching the action will update the store
    }

    function getGigReviewsAvgRate(reviews) {
        if (reviews.length === 0) return 0
        const totalRate = reviews.reduce((sum, review) => sum + review.rate, 0)
        const avgRate = totalRate / reviews.length
        return avgRate.toFixed(1)
    }

    return (
        <article className="preview">
            <div className="img-wrapper">
                <ImgCarousel imgUrls={gig.imgUrls} onClickImg={goToDetails} />
                <button className="like-btn" onClick={onClickLike}><FavoriteBorderIcon /></button>
            </div>
            <div className="gig-user-preview">
                <img className="gig-user-img" src={gig.owner.imgUrl} />
                {gig.promoted && <span>Ad by </span>}
                <span className="gig-user-fullname"> {gig.owner.fullname}</span>
            </div>
            <Link className="gig-title" to={`/gig/${gig._id}`}>{gig.title}</Link>
            <div className="gig-rating-preview">
                <span><StarIcon /></span>
                <span>{getGigReviewsAvgRate(gig.reviews)}</span>
                <span className="gig-previews-count">({gig.reviews.length})</span>
            </div>
            <p className="gig-price">From USD${gig.price}</p>
        </article>
    )
}
