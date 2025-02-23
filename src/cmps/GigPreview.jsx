import { Link, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { updateGig } from '../store/actions/gig.actions'
import { userService } from '../services/user'
import { ImgCarousel } from '../cmps/ImgCarousel'
import StarRateIcon from '@mui/icons-material/StarRate';

export function GigPreview({ gig }) {
    const loggedInUser = userService.getLoggedinUser()
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const tagsParam = searchParams.get('tags')

    function goToDetails(gigId) {
        navigate(`/gig/${gigId}/?tags=${tagsParam}`)
    }

    async function onClickLike(ev) {
        ev.stopPropagation()

        if (!loggedInUser) return

        const isLiked = isGigLikedByUser()
        const updatedLikedByUsers = isLiked
            ? gig.likedByUsers.filter(user => user._id !== loggedInUser._id) // Remove user
            : [...gig.likedByUsers, loggedInUser]

        const updatedGig = { ...gig, likedByUsers: updatedLikedByUsers }

        try {
            const savedGig = await updateGig(updatedGig)
        } catch (err) {
            console.error('Error updating gig like status:', err)
        }
    }


    function getGigReviewsAvgRate(reviews) {
        if (reviews.length === 0) return 0
        const totalRate = reviews.reduce((sum, review) => sum + review.rate, 0)
        const avgRate = totalRate / reviews.length
        return avgRate.toFixed(1)
    }

    function isGigLikedByUser() {
        if (!gig.likedByUsers) return false
        return gig.likedByUsers.some(user => user._id === loggedInUser._id)
    }
    return (
        <article className="preview">
            <div className="img-wrapper">
                <ImgCarousel imgUrls={gig.imgUrls} onClickImg={() => goToDetails(gig._id)} />
                <button
                    className="like-btn"
                    onClick={onClickLike}>
                    <div className={`heart ${isGigLikedByUser() ? 'selected' : ''}`}>

                    </div>
                </button>
            </div>
            <div className="gig-user-preview">
                <img className="gig-user-img" src={gig.owner.imgUrl} />
                {gig.promoted && <span>Ad by </span>}
                <span className="gig-user-fullname"> {gig.owner.fullname}</span>
            </div>
            <Link className="gig-title" to={`/gig/${gig._id}`}>{gig.title}</Link>
            <div className="gig-rating-preview">
                <span><StarRateIcon /></span>
                <span>{getGigReviewsAvgRate(gig.reviews)}</span>
                <span className="gig-previews-count">({gig.reviews.length})</span>
            </div>
            <p className="gig-price">From US${gig.price}</p>
        </article>
    )
}
