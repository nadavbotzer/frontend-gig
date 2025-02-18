import '../../assets/styles/cmps/InfoSeller.scss'

export function InfoSeller({ location, createdAt, avgResponseStr, lastDeliveryAt, languagesArray }) {
    return <div className="info-seller">
        <section className='border-bottom'>
            <div className="column padding-bottom">
                <div className="label">
                    <span className="title">From</span>
                    <span className="text">United States</span>
                </div>
                <div className="label">
                    <span className="title">Avg. response time</span>
                    <span className="text">1 hour</span>
                </div>
                <div className="label">
                    <span className="title">Languages</span>
                    <span className="text">English, Spanish</span>
                </div>
            </div>

            <div className="column">
                <div className="label">
                    <span className="title">Member since</span>
                    <span className="text">Jan 2018</span>
                </div>

                <div className="label">
                    <span className="title">Last delivery</span>
                    <span className="text">2 days</span>
                </div>
            </div>
        </section>

        <section>
            <div className="column txt-content padding-top">
                <p className="about">
                    Hello esteemed Fiverr patrons, my name is Cole Rhodes-Dow! I have been animating for over 7 years, bringing to life thousands of videos for my clients as well as three original animated shows of my own! I run an animation studio made up of a team of 10 top tier animators, voice actors, and script writers, from NYC, LA, and London. We offer start to finish animated video production for business commercials, music videos, kids shows, and adult cartoons! No idea is too crazy, reach out to me and I'd love to set up a Zoom call to discuss your project details! Talk soon!
                </p>
            </div>
        </section>
    </div>
}