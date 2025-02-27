
export function BottomSectionReview({ startPriceRange, endPriceRange, duration }) {

    return <section className="bottom-section">
        <div className="price">
            <span className='txt'>₪{startPriceRange}- ₪{endPriceRange}</span>
            <span className='desc'>Price</span>
        </div>

        <div className="duration">
            <span className='txt'>{duration}</span>
            <span className='desc'>Duration</span>
        </div>
    </section>
}