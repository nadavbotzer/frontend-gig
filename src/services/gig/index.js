const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomTags, getRandomLocation, getRandomIntInclusive, makeId, getRandomGigTitle, getRandomName, getRandomCreatedAt, getRandomLanguages } from '../util.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

export function getEmptyGig() {
    return {
        title: 'I will ' + getRandomGigTitle(),
        about: "With more than 10 years of professional experience in the field of Architecture, my approach to design is innovative, creative and technically sound. \n During these years I have gained a strong command over architectural design and a building's work ability. \n So whether you're looking for a great design for your building or want to make it workable, I'm the right guy for you!!",
        price: getRandomIntInclusive(10, 2500),
        owner: {
            _id: makeId(),
            fullname: getRandomName(),
            imgUrl: 'https://randomuser.me/api/portraits/men/' + getRandomIntInclusive(1, 99) + '.jpg',
            level: getRandomIntInclusive(1, 3),
            rate: getRandomIntInclusive(1, 5),
            createdAt: getRandomCreatedAt(),
            languages: getRandomLanguages(getRandomIntInclusive(1, 5))
        },
        location: getRandomLocation(),
        daysToMake: getRandomIntInclusive(1, 10),
        description: ['A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
        'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
        'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
        'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
        'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
        'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
        'A professional service to ' + getRandomGigTitle().toLowerCase() + '.'
        ],
        imgUrls: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg"
            , "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg"
        ],
        tags: getRandomTags(),
        likedByUsers: [],
        reviews: [],
        avgResponseTime: getRandomIntInclusive(1, 24),
    }
}

// Helpers

function getDefaultFilter() {
    return {
        txt: '',
        price: {
            min: '',
            max: '',
        },
        sortField: '',
        sortDir: '',
        tags: [],
        deliveryTime: ''
    }
}

function getFilterLabels() {
    return {
        txt: 'Text',
        price: {
            min: 'Minimum',
            max: 'Maximum',
        },
        sortField: '',
        sortDir: '',
        tags: 'Categoties',
        deliveryTime: 'Delivery Time'
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const gigService = { getEmptyGig, getDefaultFilter, getFilterLabels, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.gigService = gigService
