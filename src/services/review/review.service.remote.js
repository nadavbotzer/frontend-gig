import { httpService } from '../http.service'

export const reviewService = {
	add,
	query,
	remove,
	update
}

function query(filterBy = {}) {
	return httpService.get('review', filterBy)
}

async function add(review) {
	return await httpService.post('review', review)
}

async function update(reviewId, reviewData) {
	return await httpService.put(`review/${reviewId}`, reviewData)
}

async function remove(reviewId) {
	return await httpService.delete(`review/${reviewId}`)
}
