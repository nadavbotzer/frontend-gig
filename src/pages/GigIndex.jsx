import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { loadGigs, addGig, updateGig, removeGig, addGigMsg } from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'
import { GigList } from '../cmps/GigList'
import { NavigationsAndActions } from '../cmps/Details/NavigationsAndActions'
import { FilterItem } from '../cmps/FilterItem'


export function GigIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const tagsParam = searchParams.get('tags')
    const [filterBy, setFilterBy] = useState(null)
    const filters = [
        {
            key: 'budget',
            label: 'Budget'
        },
        {
            key: 'delivery-time',
            label: 'Delivery time'
        }
    ]

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

    // async function onRemoveGig(gigId) { //Save for referance
    //     try {
    //         await removeGig(gigId)
    //         showSuccessMsg('Gig removed')
    //     } catch (err) {
    //         showErrorMsg('Cannot remove gig')
    //     }
    // }

    async function onAddGig() {
        const gig = gigService.getEmptyGig()
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }
    }

    // async function onUpdateGig(gig) { //Save for Referance
    //     const price = +prompt('New price?', gig.price)
    //     if (price === 0 || price === gig.price) return

    //     const gigToSave = { ...gig, price }
    //     try {
    //         const savedGig = await updateGig(gigToSave)
    //         showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update gig')
    //     }
    // }
    function tagsToHeading(tags) {
        return tags
            .replace(/[\[\]]/g, '')
            .split(',')
            .map(tag =>
                tag
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
            )
            .join(' and ')
    }

    function parseTags(str) {
        return str.replace(/[\[\]]/g, '').split(',').map(tag => tag.trim());
    }
    if (!gigs) return <div>Loading...</div>
    return (
        <>
            {userService.getLoggedinUser() && <button className='btn' onClick={onAddGig}>Add Gig (DEV)</button>}
            {tagsParam && <NavigationsAndActions gigCategory={tagsParam} />}
            {!tagsParam && <NavigationsAndActions gigCategory={''} />}
            <main className="gig-index">
                <h1>{tagsParam && tagsToHeading(tagsParam)}</h1>
                <div className="filter-wrapper">
                    {filters.map(filter => {
                        return <FilterItem filter={filter} key={filter.key} />
                    })}
                </div>
                <div className="sort-wrapper">
                    <span>{gigs.length} results</span>
                </div>
                <GigList
                    gigs={gigs} />
            </main>
        </>
    )
}