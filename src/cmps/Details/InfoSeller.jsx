import { timeAgo } from '../../services/util.service';

export function InfoSeller({ location, createdAt, avgResponse, lastDeliveryAt, languagesArray, aboutSellerTxt }) {

    function formatCreatedAt(timestamp) {
        const date = new Date(timestamp);
        const options = { month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return <div className="info-seller">
        <section className='border-bottom'>
            <div className="column padding-bottom">
                <div className="label">
                    <span className="title">From</span>
                    <span className="text">{location.name}</span>
                </div>
                <div className="label">
                    <span className="title">Avg. response time</span>
                    <span className="text">{`${avgResponse}  ${avgResponse > 1 ? 'hours' : 'hour'}`}</span>
                </div>
                <div className="label">
                    <span className="title">Languages</span>
                    <span className="text">{languagesArray.map((lang) => { return <span key={lang}>{lang}, </span> })}</span>
                </div>
            </div>

            <div className="column">
                <div className="label">
                    <span className="title">Member since</span>
                    <span className="text">{formatCreatedAt(createdAt)}</span>
                </div>

                <div className="label">
                    <span className="title">Last delivery</span>
                    <span className="text">{timeAgo(lastDeliveryAt)}</span>
                </div>
            </div>
        </section>

        <section>
            <div className="column txt-content padding-top">
                <p className="about">
                    {aboutSellerTxt}
                </p>
            </div>
        </section>
    </div>
}