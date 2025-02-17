import { AboutGig } from "./AboutGig";
import { AboutSeller } from "./AboutSeller";
import { GigHeader } from "./GigHeader";
import { GigImages } from "./GigImages";
import { ReviewList } from '../ReviewList';

export function GigInfo({ gig }) {

    function removeReview(id) {
        console.log('removing')
    }

    return <section className="gig-info-column">
        <GigHeader title={'My interior design project using 3d tech'} gig={gig} />
        <GigImages />
        <AboutGig descriptionContent={gig.description} />
        <AboutSeller username={gig.owner.fullname} />
        <ReviewList
            reviews={gig.reviews}
            onRemoveReview={(id) => removeReview(id)}
        />
    </section>
}