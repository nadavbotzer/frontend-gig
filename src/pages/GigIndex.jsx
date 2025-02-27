import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { addGig, loadGigs } from '../store/actions/gig.actions'

import { FilterItem } from '../cmps/FilterItem'
import { GigList } from '../cmps/GigList'
import { Navigations } from '../cmps/Navigations'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'

export function GigIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const tagsParam = searchParams.get('tags')
    const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter(parseTags(tagsParam || '')))

    const filters = [ // Will get this object from the service
        {
            key: 'price',
            label: 'Budget',
            options: [
                {
                    label: 'Value',
                    value: '-467'
                },
                {
                    label: 'Mid-range',
                    value: '467-1495'
                },
                {
                    label: 'High-end',
                    value: '1495-'
                }
            ]
        },
        {
            key: 'deliveryTime',
            label: 'Delivery time',
            options: [
                {
                    label: 'Express 24H',
                    value: '1'
                },
                {
                    label: 'Up to 3 days',
                    value: '3'
                },
                {
                    label: 'Up to 7 days',
                    value: '7'
                },
                {
                    label: 'Anytime',
                    value: ''
                },
            ]
        }
    ]

    useEffect(() => {
        if (tagsParam) {
            const tags = parseTags(tagsParam)
            setFilterBy(prevFilter => ({ ...prevFilter, tags: tags }))
        }
    }, [tagsParam])

    useEffect(() => {
        if (!filterBy) return
        loadGigs(filterBy)
    }, [filterBy])

    async function onAddGig() {
        const gig = gigService.getEmptyGig()
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }
    }

    function handleClearFilter(filterKey) {
        if (filterKey === 'deliveryTime') {
            setFilterBy(prevFilter => ({ ...prevFilter, deliveryTime: '' }))
        }
        if (filterKey === 'price') {
            setFilterBy(prevFilter => ({ ...prevFilter, price: { min: '', max: '' } }))
        }
    }

    function handleApplyFilter(filter, newValue) {
        if (filterBy[filter.key] === newValue) return

        setFilterBy(prevFilter => {
            if (filter.key === 'price') {
                const [min, max] = newValue.split('-')
                return {
                    ...prevFilter,
                    price: { min: min ? +min : '', max: max ? +max : '' } // Create a new object to break reference
                };
            }

            return {
                ...prevFilter,
                [filter.key]: newValue
            };
        });
    }

    function formatPriceRange(min, max) {
        if (min && max) return `Budget: $${min} - $${max}`
        if (min) return `Budget: $${min}`
        if (max) return `Budget: $${max}`
        return ''
    }

    function getDeliveryTimeLabel(value) {
        const deliveryTimeOption = filters.find(filter => filter.key === 'deliveryTime')
            ?.options.find(option => option.value === value)

        return deliveryTimeOption ? deliveryTimeOption.label : value
    }

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
        if (!str) return []
        return str.replace(/[\[\]]/g, '').split(',').map(tag => tag.trim());
    }

    if (!gigs) return <div>Loading...</div>

    return (
        <>
            <main className="gig-index">
                {/* {userService.getLoggedinUser() && <button className='btn' onClick={onAddGig}>Add Gig (DEV)</button>} */}
                {(!!gigs.length && tagsParam) && <Navigations gigCategory={tagsParam} />}
                {!tagsParam && <Navigations gigCategory={''} />}
                <h1>{(!!gigs.length && tagsParam) && tagsToHeading(tagsParam)}</h1>
                {<div className="filter-wrapper">
                    {filters.map(filter => {
                        return <FilterItem
                            onApplyFilter={handleApplyFilter}
                            onClearFilter={handleClearFilter}
                            filter={filter}
                            key={filter.key}
                            initalValue={filterBy[filter.key]} />
                    })}
                </div>}
                <div className="active-filters">
                    {Object.entries(filterBy).map(([key, value]) => {
                        if (key === 'tags') return null; // Ignore 'tags' completely

                        if (!value || (typeof value === 'object' && Object.values(value).every(v => v === ''))) return null;

                        let displayValue = value;
                        if (key === 'price' && typeof value === 'object') {
                            const { min, max } = value;
                            displayValue = formatPriceRange(min, max);
                        }
                        if (key === 'deliveryTime') {
                            // Get the label for delivery time using the function
                            displayValue = getDeliveryTimeLabel(value);
                        }

                        return (
                            <div key={key} className="active-filter">
                                <div>{displayValue}</div>
                                <button onClick={() => handleClearFilter(key)}>✕</button>
                            </div>
                        );
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