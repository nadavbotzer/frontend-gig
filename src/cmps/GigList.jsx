import { GigPreview } from './GigPreview'
import { userService } from '../services/user'

export function GigList({ gigs }) {

    // function shouldShowActionBtns(gig) { //save for referance
    //     const user = userService.getLoggedinUser()

    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return gig.owner?._id === user._id
    // }

    return <section>
        <ul className="list">
            {gigs.map(gig =>
                <li key={gig._id}>
                    <GigPreview gig={gig} />
                </li>)
            }
        </ul>
    </section>
}