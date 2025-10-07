import { reviewService } from '../../services/review'
import { store } from '../store'
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS, UPDATE_REVIEW } from '../reducers/review.reducer'

export async function loadReviews(filterBy = {}) {
	try {
		const response = await reviewService.query(filterBy)
		const reviews = response.reviews || response
		const pagination = response.pagination || null
		store.dispatch({ type: SET_REVIEWS, reviews, pagination })
		return response
	} catch (err) {
		console.error('ReviewActions: err in loadReviews', err)
		throw err
	}
}

export async function addReview(review) {
	try {
		const addedReview = await reviewService.add(review)
		store.dispatch({ type: ADD_REVIEW, review: addedReview })
		return addedReview
	} catch (err) {
		console.error('ReviewActions: err in addReview', err)
		throw err
	}
}

export async function updateReview(reviewId, reviewData) {
	try {
		const updatedReview = await reviewService.update(reviewId, reviewData)
		store.dispatch({ type: UPDATE_REVIEW, review: updatedReview })
		return updatedReview
	} catch (err) {
		console.error('ReviewActions: err in updateReview', err)
		throw err
	}
}

export async function removeReview(reviewId) {
	try {
		await reviewService.remove(reviewId)
		store.dispatch({ type: REMOVE_REVIEW, reviewId })
	} catch (err) {
		console.error('ReviewActions: err in removeReview', err)
		throw err
	}
}
