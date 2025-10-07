import { BottomSectionReview } from "./BottomSectionReview";
import { Profile } from "./Profile";
import { ReviewContent } from "./ReviewContent";
import { TopSectionReview } from "./TopSectionReview";


export function ReviewCard({ userId, imgSrc, location, fullname,
    createdAt, rate, text, duration, startPriceRange, endPriceRange,
    projectImg
}) {
    return <div className="card">
        <Profile
            userId={userId}
            imgSrc={imgSrc}
            location={location}
            fullname={fullname}
        />
        <div className="card-layout">
            <div className="content">
                <TopSectionReview
                    date={createdAt}
                    rate={rate}
                />
                <ReviewContent
                    text={text}
                />
                <BottomSectionReview
                    duration={duration}
                    endPriceRange={endPriceRange}
                    startPriceRange={startPriceRange}
                />
            </div>
            {projectImg && <img className='project-img' src={projectImg} />}
        </div>
    </div>
}