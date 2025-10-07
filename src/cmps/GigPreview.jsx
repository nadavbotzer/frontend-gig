import { Link, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { gigService } from '../services/gig'
import { userService } from '../services/user'
import { updateGigInStore } from '../store/actions/gig.actions'
import { ImgCarousel } from '../cmps/ImgCarousel'
import StarRateIcon from '@mui/icons-material/StarRate';

export function GigPreview({ gig }) {
    const loggedInUser = userService.getLoggedinUser()
    const navigate = useNavigate()
    
    // Don't render anything if gig is not available
    if (!gig || !gig._id) {
        return null
    }

    const [searchParams, setSearchParams] = useSearchParams()
    const tagsParam = searchParams.get('tags')

    function goToDetails(gigId) {
        navigate(`/gig/${gigId}/?tags=${tagsParam}`)
    }

    async function onClickLike(ev) {
        ev.stopPropagation()

        if (!loggedInUser) return

        try {
            const isCurrentlyLiked = isGigLikedByUser()
            
            // Make the API call
            const apiResult = await (isCurrentlyLiked 
                ? gigService.unlikeGig(gig._id)
                : gigService.likeGig(gig._id))
            
            console.log('🔍 API call result:', apiResult)
            
            // Since backend returns MongoDB result, not the updated gig, we need to create the updated gig ourselves
            const updatedGig = {
                ...gig,
                likedByUsers: isCurrentlyLiked
                    ? gig.likedByUsers.filter(user => user._id !== loggedInUser._id)
                    : [...(gig.likedByUsers || []), loggedInUser]
            }
            
            console.log('🔍 Created updated gig:', updatedGig._id, updatedGig.likedByUsers?.length)
            
            // Update Redux store with our constructed gig
            updateGigInStore(updatedGig)
            
        } catch (err) {
            console.error('Error updating gig like status:', err)
        }
    }

    function isGigLikedByUser() {
        if (!loggedInUser || !gig.likedByUsers) return false
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
                    to={`/user/${gig.owner?._id || ''}`} 
                    onClick={(e) => e.stopPropagation()}
                >
                    <img className="gig-user-img" src={gig.owner?.imgUrl || '/images/profile-default.png'} />
                </Link>
                {gig.promoted && <span>Ad by </span>}
                <Link 
                    to={`/user/${gig.owner?._id || ''}`} 
                    className="gig-user-fullname"
                    onClick={(e) => e.stopPropagation()}
                >
                    {gig.owner?.fullname || 'Unknown User'}
                </Link>
            </div>
            <Link className="gig-title" to={`/gig/${gig._id}`}>{gig.title}</Link>
            <div className="gig-rating-preview">
                <span><StarRateIcon /></span>
                <span>{gig.owner?.rate || 0}</span>
                <span className="gig-previews-count">({gig.reviewCount || 0})</span>
            </div>
            <p className="gig-price">From US${gig.price}</p>
        </article>
    )
}
