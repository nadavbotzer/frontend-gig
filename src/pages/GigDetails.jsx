import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'

import { GigInfo } from '../cmps/Details/GigInfo'
import { BuyingInfo } from '../cmps/Details/BuyingInfo'
import { GigContentLayout } from '../cmps/Details/GigContentLayout'
import { NavigationsAndActions } from '../cmps/NavigationsAndActions'
import { LoadingSpinner } from '../cmps/LoadingSpinner'

import { showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig/index.js'
import { loadReviews, addReview } from '../store/actions/review.actions'

export function GigDetails() {

  const [gig, setGig] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  const pagination = useSelector(storeState => storeState.reviewModule.pagination)

  const { gigId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const tagsParam = searchParams.get('tags')

  useEffect(() => {
    if (gigId) {
      loadGig(gigId)
      loadReviewsForPage(1)
    }
  }, [gigId])

  function loadReviewsForPage(page) {
    setCurrentPage(page)
    loadReviews({ gigId, page, limit: 5 })
    // Scroll to reviews section after a short delay to ensure content is loaded
    setTimeout(() => {
      const reviewsSection = document.querySelector('.reviews')
      if (reviewsSection) {
        const offset = -1365 // Offset from top for better UX
        const elementPosition = reviewsSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  useEffect(() => {
    gig && setIsLoading(false)
  }, [gig])

  async function loadGig(gigId) {
    setIsLoading(true)
    try {
      const gig = await gigService.getById(gigId)
      setGig(gig)
    } catch (err) {
      console.log("err: ", err);
      showErrorMsg('Could not find gig in server')
    }
  }

  async function handleReviewAdded(reviewData) {
    const addedReview = await addReview(reviewData)
    await loadReviewsForPage(1) // Go to first page after adding review
    await loadGig(gigId)
    return addedReview
  }

  function handlePageChange(newPage) {
    loadReviewsForPage(newPage)
  }

  if (isLoading || !gig) return <LoadingSpinner message="Loading gig details..." size="large" fullPage />;

  return (
    <section className="gig-page">
      <NavigationsAndActions
        gigCategory={tagsParam}
        showActions={true}
        gig={gig}
        setGig={setGig}
      />
      <GigContentLayout>
        <GigInfo 
          gig={gig} 
          reviews={reviews} 
          pagination={pagination}
          onReviewAdded={handleReviewAdded}
          onPageChange={handlePageChange}
        />
        <BuyingInfo gig={gig} />
      </GigContentLayout>
    </section>
  )
}