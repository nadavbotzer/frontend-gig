import React, { useEffect, useState } from 'react'
import { ReviewCard } from './Review/ReviewCard.jsx'
import { userService } from '../services/user'
import { Pagination } from './Pagination.jsx'

function ReviewItemWithUser({ reviewData }) {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (reviewData.userId) {
            loadUserData()
        }
    }, [reviewData.userId])

    async function loadUserData() {
        try {
            const user = await userService.getById(reviewData.userId)
            setUserData(user)
        } catch (err) {
            console.error('Failed to load user for review:', err)
        }
    }

    // Use user data from DB if available, otherwise fallback to review data
    const imgSrc = userData?.imgUrl || reviewData.imgUrl || reviewData.img
    const fullname = userData?.fullname || userData?.username || reviewData.name
    const location = userData?.location || reviewData.location

    return (
        <ReviewCard
            userId={reviewData.userId}
            imgSrc={imgSrc}
            location={location}
            fullname={fullname}
            createdAt={reviewData.reviewedAt}
            text={reviewData.review}
            rate={reviewData.rate}
            duration={reviewData.duration}
            startPriceRange={reviewData.startPriceRange}
            endPriceRange={reviewData.endPriceRange}
            projectImg={reviewData.projectImg}
        />
    )
}

export function ReviewList({ reviews, pagination, onPageChange }) {
    return <section className='reviews'>
        <h1>Reviews {pagination && `(${pagination.total})`}</h1>
        <ul className="review-list">
            {
                reviews.map((reviewData) => {
                    return <React.Fragment key={reviewData._id}>
                        <ReviewItemWithUser reviewData={reviewData} />
                        {/* <ReviewHelpful /> */}
                    </React.Fragment>
                })
            }
        </ul>
        
        {pagination && (
            <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={onPageChange}
            />
        )}
    </section>
}