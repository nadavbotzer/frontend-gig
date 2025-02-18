import { ProfileImg } from './ProfileImg.jsx';
import { StatusOnline } from '../StatusOnline.jsx';
import { Level } from '../Level.jsx';

import '../../assets/styles/cmps/MiniUser.scss'

export function MiniUser({ isAbout }) {

    function createRatingStarString(rate) {
        let stars = []
        for (let i = 0; i < rate; i++) {
            stars.push(<img className='icon' src='/images/star-dark-icon.png' key={i} />)
        }
        return stars;
    }

    const gig = {
        _id: 'g101',
        title: 'I will design your logo',
        price: 12.16,
        owner: {
            _id: 'u101',
            fullname: 'Dudu Da',
            imgUrl: '',
            level: 2,
            rate: 4,
        },
        daysToMake: 3,
        description: 'Make unique logo...',
        avgResponseTime: 1,
        loc: 'Ghana',
        imgUrls: ['/img/img1.jpg'],
        tags: ['Arts And Crafts', 'Logo Design'],
        likedByUsers: ['mini-user'],
        reviews: [
            {
                id: 'madeId',
                txt: 'Did an amazing work',
                rate: 4,
                by: {
                    _id: 'u102',
                    fullname: 'user2',
                    imgUrl: '/img/img2.jpg',
                },
            },
        ],
    }

    const stars = createRatingStarString(gig.owner.rate)

    return <div className={`mini-user ${!isAbout ? 'border-bottom' : ''}`}>

        <section className='profile-content'>

            <ProfileImg imgSrc={gig.owner.imgUrl} />

            <section className="about-user">

                <div className="about-user-row">
                    <span className="user-name">{gig.owner.fullname}</span>
                    {
                        isAbout ? <StatusOnline /> :
                            <Level level={gig.owner.level} />
                    }
                </div>

                {
                    isAbout &&
                    <div className="about-user-row">
                        <span className="about-profession">Professional Architect, 3D Artist and CGI Creator</span>
                    </div>
                }

                <div className={`about-user-row`}>

                    {!isAbout && <span className="profession">Architectural visualization artist (ArcViz)</span>}

                    <div className="rating">
                        <div className="star-rating">
                            <span className='stars'>
                                {
                                    stars.map((star) => {
                                        return star
                                    })
                                }
                            </span>
                            <span className='number'>4.9</span>
                        </div>
                        {!isAbout && <span className="reviews">({gig.reviews.length} reviews)</span>}
                        {isAbout && <span className="reviews">({gig.reviews.length})</span>}
                    </div>

                    {isAbout && <Level level={gig.owner.level} />}
                </div>

            </section>
        </section>
        {isAbout && <input type="button" value="Contact me" className='contact' />}
    </div>
}