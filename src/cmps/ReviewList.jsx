import React from 'react'

import { ReviewCard } from './Review/ReviewCard.jsx'

import "../assets/styles/cmps/ReviewList.scss"

export function ReviewList({ reviews }) {

    return <section className='reviews'>
        <h1>Reviews</h1>
        <ul className="review-list">
            {
                reviews.map(({
                    _id,
                    name,
                    img,
                    location,
                    reviewedAt,
                    review,
                    rate,
                    duration,
                    startPriceRange,
                    endPriceRange,
                    projectImg
                }) => {
                    return <React.Fragment key={_id}>
                        <ReviewCard
                            imgSrc={img}
                            location={location}
                            fullname={name}
                            createdAt={reviewedAt}
                            text={review}
                            rate={rate}
                            duration={duration}
                            startPriceRange={startPriceRange}
                            endPriceRange={endPriceRange}
                            projectImg={projectImg}
                        />
                        {/* <ReviewHelpful /> */}
                    </React.Fragment>
                })
            }
        </ul>
    </section>
}