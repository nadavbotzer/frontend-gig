const { DEV, VITE_LOCAL } = import.meta.env

import { userService } from '../user'
import { getRandomTags, getRandomLocation, getRandomIntInclusive, getRandomGigTitle, makeId, getRandomCreatedAt, getRandomDuration, getRnadomService, getRandomLanguages } from '../util.service'
import { imageService } from '../image.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

export async function getEmptyGig() {
    const loggedInUser = userService.getLoggedinUser()
    const servicesList = getRnadomService(5)
    const price = Math.ceil(getRandomIntInclusive(10, 2500))
    const daysToMake = getRandomIntInclusive(1, 10)
    
    // Generate diverse gig data
    const gigTemplates = getGigTemplates()
    const randomTemplate = gigTemplates[getRandomIntInclusive(0, gigTemplates.length - 1)]
    const randomTags = getRandomTags(getRandomIntInclusive(2, 4))
    const randomImages = await getRandomImages()
    const randomProfession = getRandomProfession()
    const userLevel = loggedInUser.level || 1 // Use actual user level, default to 1
    
    // Generate random reviews first - more reviews for better demo data
    const reviews = generateRandomReviews(getRandomIntInclusive(5, 25))
    
    // Calculate average rating from reviews
    const averageRating = reviews.length > 0 
        ? (reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length).toFixed(1)
        : (getRandomIntInclusive(35, 50) / 10).toFixed(1) // Random rating if no reviews
    
    return {
        title: randomTemplate.title,
        about: randomTemplate.about,
        price: price,
        owner: {
            ...loggedInUser,
            proffession: randomProfession,
            level: userLevel, // Use consistent user level
            rate: parseFloat(averageRating), // Use calculated average rating from reviews
            languages: loggedInUser.languages || getRandomLanguages(getRandomIntInclusive(1, 3))
        },
        location: getRandomLocation(),
        daysToMake: daysToMake,
        description: randomTemplate.description.replace('{fullname}', loggedInUser.fullname),
        imgUrls: randomImages,
        tags: randomTags,
        avgResponseTime: getRandomIntInclusive(1, 24),
        packagesList: {
            basic: { revisions: 1, daysToMake: daysToMake, price: price, servicesList: [{ text: servicesList[0], included: false }, { text: servicesList[1], included: true }, { text: servicesList[2], included: false }, { text: servicesList[3], included: true }, { text: servicesList[4], included: false }], packageDescription: 'With the basic package deal you recieve 2/5 services' },
            standard: { revisions: 2, daysToMake: daysToMake + 2, price: Math.ceil(price * 1.1), servicesList: [{ text: servicesList[0], included: true }, { text: servicesList[1], included: true }, { text: servicesList[2], included: false }, { text: servicesList[3], included: true }, { text: servicesList[4], included: false }], packageDescription: 'With the basic package deal you recieve 3/5 services' },
            premium: { revisions: 3, daysToMake: daysToMake + 3, price: Math.ceil(price * 1.20), servicesList: [{ text: servicesList[0], included: true }, { text: servicesList[1], included: true }, { text: servicesList[2], included: true }, { text: servicesList[3], included: true }, { text: servicesList[4], included: true }], packageDescription: 'With the basic package deal you recieve 5/5 services' }
        },
        likedByUsers: [],
        reviews: reviews, // Use the generated reviews
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

// Helper functions for diverse gig generation
function getGigTemplates() {
    return [
        {
            title: "I will create a modern logo for your startup",
            about: "Experienced and dedicated professional with a passion for delivering high-quality work. I strive to exceed expectations through creativity, attention to detail, and a client-focused approach. Let's bring your vision to life together!",
            description: `Welcome, I'm {fullname} \nA visionary logo and branding expert, here to craft your logo that leaves a lasting impression. With 9 years of experience under my belt, I bring a wealth of expertise to every project I undertake with a unique blend of creativity, precision & client-centric focus. Having successfully delivered over 130,000 branding orders, I stand as a testament to my unwavering commitment to excellence and client satisfaction.\nAbout the gig and what to expect?\nExpect nothing less than excellence. With a focus on creativity, simplicity and sophistication, the gig specializes in crafting sleek and impactful minimalist logo design that resonate with your target audience. From initial concept to final revisions, my process is collaborative and transparent, ensuring that your input is valued every step of the way.\nMy motto \n In a sea of options, choose a designer who stands out for all the right reasons. Choose creativity. Choose quality. Choose results. Choose me.\nCurious to see my work?Dive into my portfolio: https://www.fiverr.com/s/rmjPDb Choose between standard or premium package for portfolio-quality results\nGot Questions?\nCheck out my FAQs or I am just a message away!`
        },
        {
            title: "I will build a responsive website for your business",
            about: "Full-stack developer with expertise in modern web technologies. I create fast, secure, and user-friendly websites that help businesses grow online. Let's turn your ideas into reality!",
            description: `Hello, I'm {fullname} \nA passionate full-stack developer with 7+ years of experience creating stunning, responsive websites. I specialize in React, Node.js, and modern web technologies that deliver exceptional user experiences.\nWhat I offer:\n- Responsive design that works on all devices\n- Fast loading times and SEO optimization\n- Clean, modern code that's easy to maintain\n- E-commerce solutions and custom functionality\n- Ongoing support and maintenance\n\nI believe in clear communication, timely delivery, and exceeding client expectations. Let's discuss your project and bring your vision to life!`
        },
        {
            title: "I will write engaging content for your blog",
            about: "Professional content writer specializing in SEO-optimized articles, blog posts, and marketing copy. I help businesses connect with their audience through compelling storytelling and strategic content.",
            description: `Hi there, I'm {fullname} \nA skilled content writer with 5+ years of experience creating engaging, SEO-optimized content that drives traffic and converts readers into customers.\nMy expertise includes:\n- Blog posts and articles\n- Website copy and landing pages\n- Social media content\n- Email marketing campaigns\n- Product descriptions and reviews\n\nI research thoroughly, write clearly, and always meet deadlines. Let's create content that resonates with your audience and achieves your business goals!`
        },
        {
            title: "I will edit your videos professionally",
            about: "Video editing specialist with a creative eye for storytelling. I transform raw footage into polished, engaging videos that captivate your audience and deliver your message effectively.",
            description: `Welcome, I'm {fullname} \nA professional video editor with 6+ years of experience creating compelling visual content. I specialize in turning your raw footage into polished, professional videos that tell your story.\nServices I provide:\n- Professional video editing and color correction\n- Motion graphics and animations\n- Audio enhancement and music integration\n- Multiple format delivery (MP4, MOV, etc.)\n- Quick turnaround times\n\nI use industry-standard software like Adobe Premiere Pro, After Effects, and DaVinci Resolve. Let's create something amazing together!`
        },
        {
            title: "I will design your mobile app UI/UX",
            about: "UI/UX designer focused on creating intuitive, beautiful mobile experiences. I combine user research, design thinking, and technical knowledge to deliver apps that users love.",
            description: `Hello, I'm {fullname} \nA dedicated UI/UX designer with 4+ years of experience creating user-centered mobile applications. I focus on making complex interactions simple and delightful.\nWhat I deliver:\n- User research and persona development\n- Wireframes and interactive prototypes\n- High-fidelity UI designs\n- Design systems and style guides\n- Usability testing and optimization\n\nI work closely with developers to ensure designs are implemented perfectly. Let's create an app that users will love!`
        },
        {
            title: "I will translate your documents accurately",
            about: "Professional translator with native-level proficiency in multiple languages. I provide accurate, culturally appropriate translations that maintain the original meaning and tone.",
            description: `Hi, I'm {fullname} \nA certified translator with 8+ years of experience providing high-quality translations across various industries and document types.\nLanguages I work with:\n- English, Spanish, French, German\n- Business documents and contracts\n- Technical manuals and guides\n- Marketing materials and websites\n- Academic papers and research\n\nI ensure accuracy, cultural sensitivity, and timely delivery. Your message deserves to be heard clearly in any language!`
        },
        {
            title: "I will optimize your website for SEO",
            about: "SEO specialist helping businesses improve their online visibility and organic traffic. I use proven strategies and technical expertise to boost your search engine rankings.",
            description: `Welcome, I'm {fullname} \nAn SEO expert with 6+ years of experience helping businesses dominate search results and increase organic traffic.\nMy SEO services include:\n- Comprehensive SEO audits\n- Keyword research and strategy\n- On-page and technical optimization\n- Content optimization and link building\n- Local SEO and Google My Business\n\nI provide detailed reports and clear explanations of all optimizations. Let's get your website ranking higher and driving more qualified traffic!`
        },
        {
            title: "I will create stunning social media graphics",
            about: "Social media designer creating eye-catching visuals that engage your audience and strengthen your brand. I design graphics that stop the scroll and drive action.",
            description: `Hello, I'm {fullname} \nA creative social media designer with 5+ years of experience creating compelling visual content that drives engagement and builds brand awareness.\nWhat I create:\n- Instagram posts and stories\n- Facebook covers and ads\n- LinkedIn graphics and banners\n- Twitter headers and posts\n- Pinterest pins and boards\n\nI stay updated with design trends and platform requirements. Let's create social media content that makes your brand stand out!`
        }
    ]
}

async function getRandomImages() {
    // Get 3-5 random images from the image service
    const numImages = getRandomIntInclusive(3, 5)
    return await imageService.getRandomImages(numImages)
}

function getRandomProfession() {
    const professions = [
        "A skilled graphic designer specializing in vibrant illustrations and creative branding",
        "A passionate web developer creating modern, responsive websites",
        "A creative content writer crafting engaging stories and compelling copy",
        "A professional video editor bringing stories to life through visual media",
        "A talented UI/UX designer focused on user-centered mobile experiences",
        "A certified translator providing accurate multilingual communication",
        "An SEO specialist helping businesses improve their online visibility",
        "A social media designer creating eye-catching visual content",
        "A digital marketing expert driving growth through strategic campaigns",
        "A professional photographer capturing moments that tell your story",
        "A voice-over artist bringing characters and scripts to life",
        "A music producer creating original compositions and soundtracks",
        "A data analyst providing insights that drive business decisions",
        "A virtual assistant helping businesses stay organized and efficient",
        "A business consultant providing strategic guidance for growth"
    ]
    return professions[getRandomIntInclusive(0, professions.length - 1)]
}

function generateRandomReviews(count) {
    const reviewTemplates = [
        // 5-star reviews (60% of reviews)
        "Absolutely amazing work! Exceeded all my expectations and delivered ahead of schedule.",
        "Outstanding quality and professionalism. This seller is truly exceptional!",
        "Perfect! Exactly what I envisioned and more. Highly recommend this seller.",
        "Fantastic work! The attention to detail is incredible. Will definitely order again.",
        "Excellent communication and delivery. The final result exceeded my wildest dreams.",
        "Outstanding service! Very creative and professional approach. Love it!",
        "Amazing results! This seller knows their craft inside and out. Highly satisfied!",
        "Perfect execution! Very professional and delivered exactly what was promised.",
        "Exceptional work! The quality is top-notch and communication was excellent.",
        "Outstanding! This seller delivered beyond my expectations. Highly recommended!",
        "Fantastic experience! Great work, fast delivery, and excellent communication.",
        "Amazing work! Very professional and creative. Will definitely use again.",
        "Outstanding quality! This seller is a true professional. Highly satisfied!",
        "Perfect! Great work, fast delivery, and excellent communication throughout.",
        "Exceptional service! The final result is exactly what I was looking for.",
        
        // 4-star reviews (25% of reviews)
        "Very good work! Professional and delivered on time. Minor revisions needed but overall satisfied.",
        "Great quality work! Good communication and delivered as promised. Would recommend.",
        "Good experience overall. The work was solid and delivered within the timeframe.",
        "Nice work! Professional approach and good communication. Happy with the result.",
        "Solid work! Delivered what was promised with good communication throughout.",
        "Good quality! The seller was responsive and delivered on time. Satisfied overall.",
        "Decent work! Met expectations and delivered within the agreed timeframe.",
        "Good experience! Professional communication and delivered as requested.",
        
        // 3-star reviews (10% of reviews)
        "Average work. Met basic requirements but could have been better. Communication was okay.",
        "Decent work overall. Some issues but seller was willing to make adjustments.",
        "Okay work. Not exceptional but got the job done. Communication could be better.",
        "Average experience. Work was acceptable but took longer than expected.",
        
        // 2-star reviews (3% of reviews)
        "Below expectations. Had to request multiple revisions. Communication was poor.",
        "Not satisfied. The work didn't meet the requirements and needed major changes.",
        
        // 1-star reviews (2% of reviews)
        "Very disappointed. Poor quality work and unresponsive seller. Would not recommend."
    ]
    
    const reviewerNames = [
        "alex_johnson", "sarah_wilson", "mike_chen", "emma_brown", "david_smith",
        "lisa_garcia", "james_taylor", "anna_davis", "robert_miller", "julia_white",
        "chris_anderson", "maria_thomas", "kevin_jackson", "sophie_martin", "daniel_lee",
        "olivia_hall", "ryan_clark", "grace_lewis", "matt_walker", "zoe_young",
        "jake_moore", "sophia_adams", "ethan_wright", "isabella_green", "noah_king",
        "ava_scott", "liam_turner", "mia_phillips", "lucas_campbell", "charlotte_parker",
        "benjamin_evans", "amelia_edwards", "henry_collins", "harper_stewart", "sebastian_sanchez",
        "ella_morris", "jackson_rogers", "grace_reed", "aiden_cook", "lily_morgan"
    ]
    
    const reviews = []
    for (let i = 0; i < count; i++) {
        // Weighted rating distribution for more realistic reviews
        let randomRating
        const ratingChance = getRandomIntInclusive(1, 100)
        if (ratingChance <= 60) {
            randomRating = 5 // 60% chance for 5 stars
        } else if (ratingChance <= 85) {
            randomRating = 4 // 25% chance for 4 stars
        } else if (ratingChance <= 95) {
            randomRating = 3 // 10% chance for 3 stars
        } else if (ratingChance <= 98) {
            randomRating = 2 // 3% chance for 2 stars
        } else {
            randomRating = 1 // 2% chance for 1 star
        }
        
        // Select review text based on rating
        let reviewText
        if (randomRating === 5) {
            reviewText = reviewTemplates[getRandomIntInclusive(0, 14)]
        } else if (randomRating === 4) {
            reviewText = reviewTemplates[getRandomIntInclusive(15, 22)]
        } else if (randomRating === 3) {
            reviewText = reviewTemplates[getRandomIntInclusive(23, 26)]
        } else if (randomRating === 2) {
            reviewText = reviewTemplates[getRandomIntInclusive(27, 28)]
        } else {
            reviewText = reviewTemplates[29]
        }
        
        reviews.push({
            _id: makeId(),
            name: reviewerNames[getRandomIntInclusive(0, reviewerNames.length - 1)],
            img: '',
            location: getRandomLocation(),
            reviewedAt: getRandomCreatedAt(),
            review: reviewText,
            rate: randomRating,
            duration: getRandomDuration(),
            startPriceRange: getRandomIntInclusive(50, 5000),
            endPriceRange: getRandomIntInclusive(50, 5000),
            projectImg: ''
        })
    }
    
    return reviews
}
