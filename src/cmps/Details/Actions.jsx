import { useState } from 'react';

import { updateGig } from '../../store/actions/gig.actions';

import '../../assets/styles/cmps/Actions.scss';

export function Actions({ gig, setGig }) {

    const [ripples, setRipples] = useState([])

    const loggedInUser = userService.getLoggedinUser()

    function onClickLike(event) {
        const { left, top } = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - left
        const y = event.clientY - top
        setRipples((prev) => [...prev, { x, y, id: Date.now() }])
        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== Date.now()))
        }, 600)
        updatedLike(event)
    }

    async function updatedLike(ev) {
        ev.stopPropagation()

        if (!loggedInUser) return

        const updatedLikedByUsers = isGigLikedByUser()
        ? gig.likedByUsers.filter(user => user._id !== loggedInUser._id)
        : [...gig.likedByUsers, loggedInUser]
        
        const updatedGig = { ...gig, likedByUsers: updatedLikedByUsers }

        try {
            const savedGig = await updateGig(updatedGig)
            setGig(savedGig)
        } catch (err) {
            console.error('Error updating gig like status:', err)
        }
    }

    function isGigLikedByUser() {
        return gig.likedByUsers.some(user => user._id === loggedInUser._id)
    }

    return <section className="actions">
        <div className="like">
            <div className="image-container" onClick={(event) => onClickLike(event)}>
                <img
                    className={`${isGigLikedByUser() ? "clicked" : ""}`}
                    src={!isGigLikedByUser() ? '/images/heart-icon.png' : '/images/red-heart-icon.png'}
                />
                {
                    ripples.map(({ x, y, id }) => {
                        return <span
                            key={id}
                            className="ripple"
                            style={{ top: y - 9, left: x - 9 }}
                        />
                    })
                }
            </div>
            <span className='amount-likes'>{gig.likedByUsers.length}</span>
        </div>
    </section>
}