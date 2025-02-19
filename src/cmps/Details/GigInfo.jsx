import { AboutGig } from "./AboutGig";
import { AboutSeller } from "./AboutSeller";
import { GigHeader } from "./GigHeader";
import { GigImages } from "./GigImages";
import { ReviewList } from "../ReviewList";

import { getRandomCreatedAt, getRandomDuration, getRandomIntInclusive, getRandomLocation, makeId } from "../../services/util.service";
import { ImgCarousel } from "../ImgCarousel";

export function GigInfo({ gig }) {

    const { title, owner, imgUrls, description, location, avgResponseTime, about } = gig

    const reviews = [
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
    ]

    function removeReview(id) {
        console.log('removing')
    }

    return <section className="gig-info-column">
        <GigHeader
            title={title}
            owner={owner}
            reviewsCount={reviews.length}
        />
        <ImgCarousel imgUrls={imgUrls} withImgPreview={true} />
        <AboutGig
            descriptionContent={description}
        />
        <AboutSeller
            owner={owner}
            location={location}
            createdAt={owner.createdAt || getRandomCreatedAt()}
            languagesArray={owner.languages}
            lastDeliveryAt={getRandomCreatedAt()}
            avgResponse={avgResponseTime}
            reviewsCount={reviews.length}
            about={about}
        />
        <ReviewList
            reviews={reviews}
            onRemoveReview={(id) => removeReview(id)}
        />
    </section>
}