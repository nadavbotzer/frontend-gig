import { timeAgo } from '../../services/util.service'

import '../../assets/styles/cmps/TopSectionReview.scss'

export function TopSectionReview({ rate, date }) {

    const stars = []
    function createRatingStarString(rate) {
        for (let i = 0; i < rate; i++) {
            stars.push(<img className='icon' src='/images/star-dark-icon.png' key={i + date} />)
        }
    }

    const ratingStr = createRatingStarString(rate)
    const dateStr = timeAgo(date)

    return <section className="top-section">
        <span className="rating">
            {
                <span className='stars'>
                    {
                        stars.map((star) => {
                            return star
                        })
                    }
                </span>
            }
            {rate}
        </span>
        <span className='gray-circle'></span>
        <span className="date">{dateStr}</span>
    </section>
}