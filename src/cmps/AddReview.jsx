import { useState } from 'react'
import { userService } from '../services/user'
import { ProfileImg } from './MiniUser/ProfileImg'
import StarRateIcon from '@mui/icons-material/StarRate'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import "/node_modules/flag-icons/css/flag-icons.min.css"

export function AddReview({ gigId, onReviewAdded }) {
	const loggedInUser = userService.getLoggedinUser()
	const [reviewData, setReviewData] = useState({
		review: '',
		rate: 5,
		duration: '',
		startPriceRange: '',
		endPriceRange: ''
	})
	const [hoveredStar, setHoveredStar] = useState(0)
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	if (!loggedInUser) {
		return null
	}

	function handleChange(ev) {
		const { name, value } = ev.target
		setReviewData(prev => ({ ...prev, [name]: value }))
		setError('')
	}

	function handleRateClick(rating) {
		setReviewData(prev => ({ ...prev, rate: rating }))
	}

	async function handleSubmit(ev) {
		ev.preventDefault()
		setError('')

		if (reviewData.review.length < 10) {
			setError('Review must be at least 10 characters')
			return
		}

		setIsSubmitting(true)
		try {
			const reviewToAdd = {
				gigId,
				review: reviewData.review,
				rate: reviewData.rate,
				duration: reviewData.duration || 'Not specified',
				startPriceRange: parseInt(reviewData.startPriceRange) || 0,
				endPriceRange: parseInt(reviewData.endPriceRange) || 0
			}

			await onReviewAdded(reviewToAdd)
			
			setReviewData({
				review: '',
				rate: 5,
				duration: '',
				startPriceRange: '',
				endPriceRange: ''
			})
		} catch (err) {
			console.error('Failed to submit review:', err)
			setError(err.response?.data?.error || 'Failed to submit review')
		} finally {
			setIsSubmitting(false)
		}
	}

	const stars = []
	for (let i = 1; i <= 5; i++) {
		const isFilled = i <= (hoveredStar || reviewData.rate)
		stars.push(
			isFilled ? (
				<StarRateIcon
					key={i}
					className="star-input filled"
					onClick={() => handleRateClick(i)}
					onMouseEnter={() => setHoveredStar(i)}
					onMouseLeave={() => setHoveredStar(0)}
				/>
			) : (
				<StarBorderIcon
					key={i}
					className="star-input"
					onClick={() => handleRateClick(i)}
					onMouseEnter={() => setHoveredStar(i)}
					onMouseLeave={() => setHoveredStar(0)}
				/>
			)
		)
	}

	return (
		<div className="card add-review-card">
			<div className="review-profile">
				<ProfileImg imgUrl={loggedInUser.imgUrl} />
				<div className="user-info">
					<span className="fullname">{loggedInUser.fullname || loggedInUser.username}</span>
					{loggedInUser.location && (
						<span className="location-dtl">
							<span className={`fi fi-${loggedInUser.location.format} small`}></span>
							<span className="location">{loggedInUser.location.name}</span>
						</span>
					)}
				</div>
			</div>

			<form onSubmit={handleSubmit} className="card-layout">
				<div className="content">
					<section className="top-section">
						<span className="rating">
							<span className="stars">
								{stars}
							</span>
							{reviewData.rate}
						</span>
					</section>

					<div className="text">
						<textarea
							name="review"
							value={reviewData.review}
							onChange={handleChange}
							placeholder="Share your experience with this gig..."
							rows="3"
							required
						/>
					</div>

					<section className="bottom-section">
						<div className="price">
							<div className="price-inputs">
								<input
									type="number"
									name="startPriceRange"
									value={reviewData.startPriceRange}
									onChange={handleChange}
									placeholder="From"
								/>
								<span>-</span>
								<input
									type="number"
									name="endPriceRange"
									value={reviewData.endPriceRange}
									onChange={handleChange}
									placeholder="To"
								/>
							</div>
							<span className="desc">Price</span>
						</div>

						<div className="duration">
							<input
								type="text"
								name="duration"
								value={reviewData.duration}
								onChange={handleChange}
								placeholder="e.g., 1 week"
							/>
							<span className="desc">Duration</span>
						</div>
					</section>

					{error && <div className="error-message">{error}</div>}

					<div className="submit-section">
						<button
							type="submit"
							className="btn-submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Submitting...' : 'Submit Review'}
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

