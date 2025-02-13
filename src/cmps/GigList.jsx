import { useNavigate } from 'react-router'

import { GigPreview } from './GigPreview'

import { userService } from '../services/user'

export function GigList({ gigs, onRemoveGig, onUpdateGig }) {

    const navigate = useNavigate()

    function shouldShowActionBtns(gig) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return gig.owner?._id === user._id
    }

    function goToDetails(gigId) {
        navigate(`/gig/${gigId}`)
    }

    return <section>
        <ul className="list">
            {gigs.map(gig =>
                <li key={gig._id}>
                    <GigPreview gig={gig} />
                    {/* {shouldShowActionBtns(gig) && <div className="actions">
                        <button onClick={() => onUpdateGig(gig)}>Edit</button>
                        <button onClick={() => onRemoveGig(gig._id)}>x</button>
<<<<<<< HEAD
                    </div>}
                    <input type="button" value="GO TO DETAILS" onClick={() => goToDetails(gig._id)} />
=======
                    </div>} */}
>>>>>>> fc016823d1d149c6757375ff18948992e228b6db
                </li>)
            }
        </ul>
    </section>
}