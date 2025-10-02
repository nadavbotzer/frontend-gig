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
                <Link 
                    to={`/user/${gig.owner._id}`} 
                    onClick={(e) => e.stopPropagation()}
                >
                    <img className="gig-user-img" src={gig.owner.imgUrl} />
                </Link>
                {gig.promoted && <span>Ad by </span>}
                <Link 
                    to={`/user/${gig.owner._id}`} 
                    className="gig-user-fullname"
                    onClick={(e) => e.stopPropagation()}
                >
                    {gig.owner.fullname}
                </Link>
            </div>
            <Link className="gig-title" to={`/gig/${gig._id}`}>{gig.title}</Link>
            <div className="gig-rating-preview">
                <span><StarRateIcon /></span>
                <span>{gig.owner.rate}</span>
                <span className="gig-previews-count">({gig.reviews.length})</span>
            </div>
            <p className="gig-price">From US${gig.price}</p>
        </article>
    )
}
