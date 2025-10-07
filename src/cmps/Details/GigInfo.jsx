import { AboutGig } from "./AboutGig";
import { AboutSeller } from "./AboutSeller";
import { GigHeader } from "./GigHeader";
import { ReviewList } from "../ReviewList";
import { AddReview } from "../AddReview";
import { ImgCarousel } from "../ImgCarousel";

import { getRandomCreatedAt } from "../../services/util.service";
import { userService } from "../../services/user";

export function GigInfo({ gig, reviews, onReviewAdded }) {

    const { title, owner, imgUrls, description, location, avgResponseTime, about } = gig
    const loggedInUser = userService.getLoggedinUser()
    
    const canAddReview = loggedInUser && loggedInUser.id !== owner._id && 
        !reviews?.some(review => review.userId === loggedInUser?.id || review.name === loggedInUser?.username)

    return <section className="gig-info-column">
        <GigHeader
            title={title}
            owner={owner}
            reviewsCount={reviews?.length || 0}
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
            reviewsCount={reviews?.length || 0}
            about={about}
        />
        {reviews && reviews.length > 0 && (
            <ReviewList reviews={reviews} />
        )}
        {canAddReview && onReviewAdded && (
            <AddReview 
                gigId={gig.id || gig._id} 
                onReviewAdded={onReviewAdded} 
            />
        )}
    </section>
}