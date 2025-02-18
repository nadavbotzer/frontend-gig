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
        price: getRandomIntInclusive(10, 2500),
        owner: {
            _id: makeId(),
            fullname: getRandomName(),
            imgUrl: 'https://randomuser.me/api/portraits/men/' + getRandomIntInclusive(1, 99) + '.jpg',
            level: getRandomLevel(),
            rate: getRandomIntInclusive(1, 5),
        },
        daysToMake: getRandomIntInclusive(1, 10),
        description: [
            'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
            'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
            'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
            'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
            'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
            'A professional service to ' + getRandomGigTitle().toLowerCase() + '.',
            'A professional service to ' + getRandomGigTitle().toLowerCase() + '.'
        ],
        avgResponseTime: getRandomIntInclusive(1, 24),
        loc: getRandomLocation(),
        imgUrls: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg"
        ],
        tags: getRandomTags(),
        likedByUsers: [],
        reviews: [
            {
                name: "rachelrbarnes1",
                country: "United States",
                flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                review: "Incredibly grateful for the amazing experience working with you . You are so talented and a kind soul! I highly recommend if you want high quality art to work with her every time",
                reviewedAt: "Published 1 month ago",
                rate: getRandomIntInclusive(1, 5)
            },
            {
                name: "mark001994",
                country: "Austria",
                flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
                review: "The artist was very kind and polite also very fast at the communication. The delivery of the project was on time. And her work is worth the money. I'm really excited about the painting she did. I can truely recommend the Aritst and her work. Big Thanks! :)",
                reviewedAt: "Published 1 month ago",
                rate: getRandomIntInclusive(1, 5)
            },
            {
                name: "thurstonrobby",
                country: "United States",
                flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                review: "incredible on how precise that art is, picture perfect. 100% amazing job and I will use your services again ...",
                reviewedAt: "Published 3 weeks ago",
                rate: getRandomIntInclusive(1, 5)
            },
            {
                name: "gavrielm",
                country: "Israel",
                flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
                review: "amazing saller and great work",
                reviewedAt: "Published 6 days ago",
                rate: getRandomIntInclusive(1, 5)
            },
            {
                name: "garebear52",
                country: "United States",
                flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                review: "Beautiful drawing! Just what I wanted.",
                reviewedAt: "Published 1 week ago",
                rate: getRandomIntInclusive(1, 5)
            }
        ]
        ,
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
