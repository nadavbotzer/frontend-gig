
import { storageService } from '../async-storage.service'
import { getRandomTags, getRandomLocation, getRandomIntInclusive, makeId, getRandomGigTitle, getRandomName, getRandomLevel } from '../util.service'
import { userService } from '../user'
import { gigService as indexGigService } from './index'
const STORAGE_KEY = 'gig'

export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg
}
window.cs = gigService


async function query(filterBy = indexGigService.getDefaulFilter()) {
    console.log('filter', filterBy)
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
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    if (minPrice) {
        console.log('min price', minPrice)
        console.log('gigs', [...gigs])
        gigs = gigs.filter(gig => gig.price >= minPrice)

    }
    if (maxPrice) {
        console.log('max price', maxPrice)
        console.log('gigs', [...gigs])
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
        // Create a new gig
        const gigToSave = {
            _id: makeId(),
            title: gig.title || 'I will ' + getRandomGigTitle(),
            price: gig.price || getRandomIntInclusive(10, 300),
            owner: userService.getLoggedinUser(),
            daysToMake: gig.daysToMake || getRandomIntInclusive(1, 10),
            description: gig.description || 'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
            avgResponseTime: gig.avgResponseTime || getRandomIntInclusive(1, 24),
            loc: gig.loc || getRandomLocation(),
            imgUrls: gig.imgUrls || ['/img/img' + getRandomIntInclusive(1, 5) + '.jpg'],
            tags: gig.tags || getRandomTags(),
            likedByUsers: gig.likedByUsers || [],
            reviews: gig.reviews || [],
        }
        savedGig = await storageService.post(STORAGE_KEY, gigToSave);
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