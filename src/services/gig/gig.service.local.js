import { storageService } from '../async-storage.service'
import { getRandomTags, getRandomLocation, getRandomIntInclusive, makeId, getRandomGigTitle, getRandomName, getRandomLevel } from '../util.service'
import { userService } from '../user'
import { getDefaultFilter } from '../util.service'

const STORAGE_KEY = 'gig'

export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg,
    likeGig,
    unlikeGig
}

window.cs = gigService

async function query(filterBy = getDefaultFilter()) {

    let gigs = await storageService.query(STORAGE_KEY)
    const { txt, price, sortField, sortDir, tags, deliveryTime } = filterBy
    const minPrice = price.min
    const maxPrice = price.max

    if (tags && tags.length) {
        gigs = gigs.filter(gig =>
            tags.some(tag => gig.tags.some(gigTag => gigTag.toLowerCase().includes(tag.toLowerCase())))
        )
    }
    if (deliveryTime) {
        gigs = gigs.filter(gig => gig.daysToMake <= deliveryTime) // Filter gigs by max delivery days
    }
    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gigs = gigs.filter(gig => {
            // Check title
            if (regex.test(gig.title)) return true
            
            // Check description - handle both string and array formats
            if (typeof gig.description === 'string') {
                return regex.test(gig.description)
            } else if (Array.isArray(gig.description)) {
                return gig.description.some(item => regex.test(item.text || ''))
            }
            
            return false
        })
    }
    if (minPrice) {
        gigs = gigs.filter(gig => gig.price >= minPrice)
    }
    if (maxPrice) {
        gigs = gigs.filter(gig => gig.price <= maxPrice)
    }
    if (sortField === 'title' || sortField === 'owner') {
        gigs.sort((gig1, gig2) =>
            gig1[sortField].localeCompare(gig2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'price') {
        gigs.sort((gig1, gig2) =>
            (gig1[sortField] - gig2[sortField]) * +sortDir)
    }
    return gigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    let savedGig;

    if (gig._id) {
        // Update existing gig
        const gigToSave = {
            ...gig, // Keep all properties to avoid data loss
            _id: gig._id,
        };
        savedGig = await storageService.put(STORAGE_KEY, gigToSave);
    } else {
        savedGig = await storageService.post(STORAGE_KEY, gig);
    }

    return savedGig
}

async function addGigMsg(gigId, txt) {
    // Later, this is all done by the backend
    const gig = await getById(gigId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gig.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gig)

    return msg
}

async function likeGig(gigId) {
    const gig = await getById(gigId)
    const loggedInUser = userService.getLoggedinUser()
    
    if (!loggedInUser || !gig) return gig
    
    // Initialize likedByUsers if it doesn't exist
    if (!gig.likedByUsers) {
        gig.likedByUsers = []
    }
    
    // Add user to likedByUsers if not already there
    if (!gig.likedByUsers.some(user => user._id === loggedInUser._id)) {
        gig.likedByUsers.push(loggedInUser)
        await storageService.put(STORAGE_KEY, gig)
    }
    
    return gig
}

async function unlikeGig(gigId) {
    const gig = await getById(gigId)
    const loggedInUser = userService.getLoggedinUser()
    
    if (!loggedInUser || !gig) return gig
    
    // Initialize likedByUsers if it doesn't exist
    if (!gig.likedByUsers) {
        gig.likedByUsers = []
    }
    
    // Remove user from likedByUsers
    gig.likedByUsers = gig.likedByUsers.filter(user => user._id !== loggedInUser._id)
    await storageService.put(STORAGE_KEY, gig)
    
    return gig
}