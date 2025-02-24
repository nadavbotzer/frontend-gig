const { DEV, VITE_LOCAL } = import.meta.env

import { userService } from '../user'
import { getRandomTags, getRandomLocation, getRandomIntInclusive, getRandomGigTitle, makeId, getRandomCreatedAt, getRandomDuration, getRnadomService, getRandomLanguages } from '../util.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

export function getEmptyGig() {
    const loggedInUser = userService.getLoggedinUser()
    const servicesList = getRnadomService(5)
    const price = Math.ceil(getRandomIntInclusive(10, 2500))
    const daysToMake = getRandomIntInclusive(1, 10)
    return {
        title: "I will create a modern logo for your startup",
        about: "Experienced and dedicated professional with a passion for delivering high-quality work. I strive to exceed expectations through creativity, attention to detail, and a client-focused approach. Let's bring your vision to life together!",
        price: price,
        owner: {
            ...loggedInUser,
            proffession: "A skilled graphic designer specializing in vibrant illustrations and creative branding",
        },
        location: getRandomLocation(),
        daysToMake: daysToMake,
        description: `Welcome, I'm ${loggedInUser.fullname} \nA visionary logo and branding expert, here to craft your logo that leaves a lasting impression. With 9 years of experience under my belt, I bring a wealth of expertise to every project I undertake with a unique blend of creativity, precision & client-centric focus. Having successfully delivered over 130,000 branding orders, I stand as a testament to my unwavering commitment to excellence and client satisfaction.\nAbout the gig and what to expect?\nExpect nothing less than excellence. With a focus on creativity, simplicity and sophistication, the gig specializes in crafting sleek and impactful minimalist logo design that resonate with your target audience. From initial concept to final revisions, my process is collaborative and transparent, ensuring that your input is valued every step of the way.\nMy motto \n In a sea of options, choose a designer who stands out for all the right reasons. Choose creativity. Choose quality. Choose results. Choose me.\nCurious to see my work?Dive into my portfolio: https://www.fiverr.com/s/rmjPDb Choose between standard or premium package for portfolio-quality results\nGot Questions?\nCheck out my FAQs or I am just a message away!`,
        imgUrls: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/201392313/original/7ff83ecce45cb759a5a576112622a309b0e1155f.png",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/143871884/original/cdba0a3892ba81a7c1b202b10e9385825787f4b6.png",
        ],
        tags: ['graphics', 'design'],
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

function getDefaultFilter(tags) {
    return {
        txt: '',
        price: {
            min: '',
            max: '',
        },
        sortField: '',
        sortDir: '',
        tags: tags || [],
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
