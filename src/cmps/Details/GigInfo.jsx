import { AboutGig } from "./AboutGig";
import { AboutSeller } from "./AboutSeller";
import { GigHeader } from "./GigHeader";
import { ReviewList } from "../ReviewList";
import { ImgCarousel } from "../ImgCarousel";

import { getRandomCreatedAt } from "../../services/util.service";

export function GigInfo({ gig }) {

    const { title, owner, imgUrls, description, location, avgResponseTime, about, reviews } = gig

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
            description={description}
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
        {
            reviews && <ReviewList
                reviews={reviews}
                onRemoveReview={(id) => removeReview(id)}
            />  
        }
    </section>
}