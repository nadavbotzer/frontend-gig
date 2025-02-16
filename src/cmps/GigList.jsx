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
                    <GigPreview gig={gig} goToDetails={() => { goToDetails(gig._id) }} />
                </li>)
            }
        </ul>
    </section>
}