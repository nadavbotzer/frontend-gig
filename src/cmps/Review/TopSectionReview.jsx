import { timeAgo } from '../../services/util.service'
import StarRateIcon from '@mui/icons-material/StarRate'


export function TopSectionReview({ rate, date }) {

    const stars = []
    function createRatingStarString(rate) {
        for (let i = 0; i < rate; i++) {
            stars.push(<StarRateIcon className='icon' key={i + date} />)
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