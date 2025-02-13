import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadGigs, addGig, updateGig, removeGig, addGigMsg } from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'

export function GigIndex() {

    const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter())
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs(filterBy)
    }, [filterBy])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onAddGig() {
        const gig = gigService.getEmptyGig()
        gig.title = prompt('Title?')
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }
    }

    async function onUpdateGig(gig) {
        const price = +prompt('New price?', gig.price)
        if (price === 0 || price === gig.price) return

        const gigToSave = { ...gig, price }
        try {
            const savedGig = await updateGig(gigToSave)
            showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
        } catch (err) {
            showErrorMsg('Cannot update gig')
        }
    }

    return (
        <>
            {/* <GigFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            {userService.getLoggedinUser() && <button onClick={onAddGig}>Add a Gig</button>}
            <main className="gig-index">
                <GigList
                    gigs={gigs}
                    onRemoveGig={onRemoveGig}
                    onUpdateGig={onUpdateGig} />
            </main>
        </>
    )
}