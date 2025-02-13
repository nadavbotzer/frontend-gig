const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomTags, getRandomLocation, getRandomIntInclusive, makeId, getRandomGigTitle, getRandomName, getRandomLevel } from '../util.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

// function getEmptyGig() {
//     return {
//         title: makeId(),
//         price: getRandomIntInclusive(80, 240),
//         msgs: [],
//     }
// }

function getEmptyGig() {
    return {
        title: 'I will ' + getRandomGigTitle(),
        price: getRandomIntInclusive(10, 300),
        owner: {
            _id: makeId(),
            fullname: getRandomName(),
            imgUrl: 'https://randomuser.me/api/portraits/men/' + getRandomIntInclusive(1, 99) + '.jpg',
            level: getRandomLevel(),
            rate: getRandomIntInclusive(1, 5),
        },
        daysToMake: getRandomIntInclusive(1, 10),
        description: 'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
        avgResponseTime: getRandomIntInclusive(1, 24),
        loc: getRandomLocation(),
        imgUrls: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg"],
        tags: getRandomTags(),
        likedByUsers: [],
        reviews: [],
    }
}

// Helpers



function getDefaultFilter() {
    return {
        txt: '',
        minPrice: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const gigService = { getEmptyGig, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.gigService = gigService
