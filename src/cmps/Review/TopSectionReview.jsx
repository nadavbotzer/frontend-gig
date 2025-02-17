import '../../assets/styles/cmps/TopSectionReview.scss'

export function TopSectionReview({ rate, date }) {

    const stars = []
    function createRatingStarString(rate) {
        for (let i = 0; i < rate; i++) {
            stars.push(<img className='icon' src='/images/star-dark-icon.png' key={i + date} />)
        }
    }

    const ratingStr = createRatingStarString(rate)

    function timeAgo(timestamp) {
        const now = Date.now()
        const diffInSeconds = Math.floor((now - timestamp) / 1000)

        const intervals = [
            { label: "year", seconds: 31536000 },
            { label: "month", seconds: 2592000 },
            { label: "day", seconds: 86400 },
            { label: "hour", seconds: 3600 },
            { label: "minute", seconds: 60 },
            { label: "second", seconds: 1 },
        ]

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds)
            if (count >= 1) {
                return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`
            }
        }

        return "Just now"
    }

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