import { ReviewCard } from './Review/ReviewCard.jsx'

import "../assets/styles/cmps/ReviewList.scss"

export function ReviewList({ reviews }) {

    return <section className='reviews'>
        <h1>Reviews</h1>
        <ul className="review-list">
            {
                reviews.map(({
                    _id,
                    by,
                    createdAt, rate, text, duration, startPriceRange, endPriceRange,
                    projectImg
                }) => {
                    return <ReviewCard
                        key={_id}
                        flagSrc={by.flagSrc}
                        imgSrc={by.imgSrc}
                        location={by.location}
                        fullname={by.fullname}
                        createdAt={createdAt}
                        rate={rate}
                        text={text}
                        duration={duration}
                        startPriceRange={startPriceRange}
                        endPriceRange={endPriceRange}
                        projectImg={projectImg}
                    />
                })
            }
        </ul>
    </section>
}