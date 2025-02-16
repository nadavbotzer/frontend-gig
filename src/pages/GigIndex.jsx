import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { loadGigs, addGig, updateGig, removeGig, addGigMsg } from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'

import { GigList } from '../cmps/GigList'
import { NavigationsAndActions } from '../cmps/Details/NavigationsAndActions'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function GigIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const tagsParam = searchParams.get('tags')
    const [filterBy, setFilterBy] = useState(null)

    useEffect(() => {
        if (tagsParam) {
            const tags = parseTags(tagsParam)
            setFilterBy(prevFilter => ({ ...prevFilter, tags: tags }))
        } else {
            setFilterBy(gigService.getDefaultFilter())
        }
    }, [tagsParam])

    useEffect(() => {
        if (!filterBy) return
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
    function tagsToHeading(tags) {
        return tags
            .replace(/[\[\]]/g, '')            // Remove brackets
            .split(',')                        // Split by commas
            .map(tag =>                        // Process each tag
                tag
                    .split('-')                // Split by hyphen
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                    .join(' ')                // Join words with space
            )
            .join(' and ');                    // Join tags with 'and'
    }

    function parseTags(str) {
        // Remove the brackets and split by comma
        return str.replace(/[\[\]]/g, '').split(',').map(tag => tag.trim());
    }
    if (!gigs) return <div>Loading...</div>
    return (
        <>
            {userService.getLoggedinUser() && <button onClick={onAddGig}>Add a Gig</button>}
            <main className="gig-index">
                <h1>{tagsParam && tagsToHeading(tagsParam)}</h1>
                <div className="filter-wrapper">
                    <button className="btn">
                        Budget <KeyboardArrowDownIcon />
                    </button>
                    <button className="btn">
                        Delivery time <KeyboardArrowDownIcon />
                    </button>
                </div>
                <div className="sort-wrapper">
                    <span>{gigs.length} results</span>
                </div>
                <GigList
                    gigs={gigs}
                    onRemoveGig={onRemoveGig}
                    onUpdateGig={onUpdateGig} />
            </main>
        </>
    )
}