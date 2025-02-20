const { DEV, VITE_LOCAL } = import.meta.env

import { userService } from '../user'
import { getRandomTags, getRandomLocation, getRandomIntInclusive, getRandomGigTitle, makeId, getRandomCreatedAt, getRandomDuration, getRnadomService } from '../util.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

export function getEmptyGig() {
    const loggedInUser = userService.getLoggedinUser()
    const servicesList = getRnadomService(5)
    const price = Math.ceil(getRandomIntInclusive(10, 2500))
    const daysToMake = getRandomIntInclusive(1, 10)
    return {
        title: 'I will ' + getRandomGigTitle(),
        about: "With more than 10 years of professional experience in the field of Architecture, my approach to design is innovative, creative and technically sound. \n During these years I have gained a strong command over architectural design and a building's work ability. \n So whether you're looking for a great design for your building or want to make it workable, I'm the right guy for you!!",
        price: price,
        owner: loggedInUser,
        location: getRandomLocation(),
        daysToMake: daysToMake,
        description: [
            {
                element: "p",
                style: ["bold", "background"],
                text: "At the pinnacle of quality and professionalism, our Excellence Level gig offers you a premium experience, ensuring outstanding results in every aspect of your project. our team of experts is dedicated to delivering beyond expectations."
            },
            {
                element: "h2",
                style: ["header"],
                text: "What Makes This Gig Exceptional?"
            },
            {
                element: "ul",
                style: ["about-list"],
                items: [
                    [
                        { text: "Tailored Solutions: ", style: ["bold", "background"] },
                        { text: "Customized strategies to meet your unique needs.", style: ["regular"] }
                    ],
                    [
                        { text: "Attention to Detail: ", style: ["bold", "background"] },
                        { text: "Every element is crafted with precision and care.", style: ["regular"] }
                    ],
                    [
                        { text: "Seamless Communication: ", style: ["bold", "background"] },
                        { text: "Transparent and responsive, keeping you in the loop.", style: ["regular"] }
                    ],
                    [
                        { text: "High-Quality Standards: ", style: ["bold", "background"] },
                        { text: "Adherence to best practices and industry benchmarks.", style: ["regular"] }
                    ],
                    [
                        { text: "Commitment to Deadlines: ", style: ["bold", "background"] },
                        { text: "Efficient project management to meet your timelines.", style: ["regular"] }
                    ],
                ]
            },
            {
                element: "p",
                style: ["regular"],
                text: "Experience the difference of true excellence—where creativity meets expertise, and your vision is transformed into reality with flawless execution."
            }
        ],
        imgUrls: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/193068192/original/a170671ee931142c619a392cd06db59b9a60eec7.jpg"
        ],
        tags: getRandomTags(),
        avgResponseTime: getRandomIntInclusive(1, 24),
        packagesList: {
            basic: { revisions: 1, daysToMake: daysToMake, price: price, servicesList: [{ text: servicesList[0], included: false }, { text: servicesList[1], included: true }, { text: servicesList[2], included: false }, { text: servicesList[3], included: true }, { text: servicesList[4], included: false }], packageDescription: 'With the basic package deal you recieve 2/5 services' },
            standard: { revisions: 2, daysToMake: daysToMake + 2, price: Math.ceil(price * 1.1), servicesList: [{ text: servicesList[0], included: true }, { text: servicesList[1], included: true }, { text: servicesList[2], included: false }, { text: servicesList[3], included: true }, { text: servicesList[4], included: false }], packageDescription: 'With the basic package deal you recieve 3/5 services' },
            premium: { revisions: 3, daysToMake: daysToMake + 3, price: Math.ceil(price * 1.20), servicesList: [{ text: servicesList[0], included: true }, { text: servicesList[1], included: true }, { text: servicesList[2], included: true }, { text: servicesList[3], included: true }, { text: servicesList[4], included: true }], packageDescription: 'With the basic package deal you recieve 5/5 services' }
        },
        likedByUsers: [],
        reviews: [
            {
                _id: makeId(),
                name: "tobiaspille300",
                img: '',
                location: getRandomLocation(),
                reviewedAt: getRandomCreatedAt(),
                review: "frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !",
                rate: getRandomIntInclusive(1, 5),
                duration: getRandomDuration(),
                startPriceRange: getRandomIntInclusive(50, 5000),
                endPriceRange: getRandomIntInclusive(50, 5000),
                projectImg: ''
            },
            {
                _id: makeId(),
                name: "liam31",
                review: "I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!",
                location: getRandomLocation(),
                reviewedAt: getRandomCreatedAt(),
                img: '',
                rate: getRandomIntInclusive(1, 5),
                duration: getRandomDuration(),
                startPriceRange: getRandomIntInclusive(50, 5000),
                endPriceRange: getRandomIntInclusive(50, 5000),
                projectImg: ''
            },
            {
                _id: makeId(),
                name: "liam31",
                review: "Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!",
                location: getRandomLocation(),
                reviewedAt: getRandomCreatedAt(),
                img: '',
                rate: getRandomIntInclusive(1, 5),
                duration: getRandomDuration(),
                startPriceRange: getRandomIntInclusive(50, 5000),
                endPriceRange: getRandomIntInclusive(50, 5000),
                projectImg: ''
            },
            {
                _id: makeId(),
                name: "larsonraz",
                review: "Very detailed",
                location: getRandomLocation(),
                reviewedAt: getRandomCreatedAt(),
                img: '',
                rate: getRandomIntInclusive(1, 5),
                duration: getRandomDuration(),
                startPriceRange: getRandomIntInclusive(50, 5000),
                endPriceRange: getRandomIntInclusive(50, 5000),
                projectImg: ''
            },
            {
                _id: makeId(),
                name: "stevekaszycki",
                review: "very nice portrait, very good quality.",
                location: getRandomLocation(),
                reviewedAt: getRandomCreatedAt(),
                img: '',
                rate: getRandomIntInclusive(1, 5),
                duration: getRandomDuration(),
                startPriceRange: getRandomIntInclusive(50, 5000),
                endPriceRange: getRandomIntInclusive(50, 5000),
                projectImg: ''
            },
            {
                _id: makeId(),
                name: "tobiaspille300",
                img: '',
                location: getRandomLocation(),
                reviewedAt: getRandomCreatedAt(),
                review: "Hamza M was fantastic! We were amazed at the speed, attention to detail, communication, responsiveness, fair pricing, and his desire to get our project right. Most importantly, we appreciated his kindness. His work helped us make an informed decision about our new home. We will recommend his services to others in the future. Thank you Hamza D for being fantastic!",
                rate: getRandomIntInclusive(1, 5),
                duration: getRandomDuration(),
                startPriceRange: getRandomIntInclusive(50, 5000),
                endPriceRange: getRandomIntInclusive(50, 5000),
                projectImg: ''
            },
        ],
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
