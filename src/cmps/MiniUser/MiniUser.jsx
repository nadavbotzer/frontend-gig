import { ProfileImg } from './ProfileImg.jsx';
import { StatusOnline } from '../StatusOnline.jsx';

import '../../assets/styles/cmps/MiniUser.scss'

export function MiniUser({ isAbout }) {
    const gig = {
        _id: 'g101',
        title: 'I will design your logo',
        price: 12.16,
        owner: {
            _id: 'u101',
            fullname: 'Dudu Da',
            imgUrl: '',
            level: 'basic/premium',
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

    return <div className={`mini-user ${!isAbout ? 'border-bottom' : ''}`}>

        <section className='profile-content'>

            <ProfileImg imgSrc={gig.owner.imgUrl} />

            <section className="about-user">

                <div className="about-user-row">
                    <span className="user-name">{gig.owner.fullname}</span>
                    {isAbout ? <StatusOnline /> : <span className='top-rated'> Top Rated: {gig.owner.rate}</span>}
                </div>

                {
                    isAbout &&
                    <div className="about-user-row">
                        <span className="about-profession">Professional Architect, 3D Artist and CGI Creator</span>
                    </div>
                }

                <div className={`about-user-row`}>
                    {!isAbout && <span className="profession">Architectural visualization artist (ArcViz)</span>}
                    <div className="star-rating">
                        <span className='stars'>
                            <img width={'20px'} src={'/images/star-icon.png'} />
                            <img width={'20px'} src={'/images/star-icon.png'} />
                            <img width={'20px'} src={'/images/star-icon.png'} />
                            <img width={'20px'} src={'/images/star-icon.png'} />
                            <img width={'20px'} src={'/images/star-icon.png'} />
                        </span>
                        <span className='number'>4.9</span>
                        <span className="reviews">{`(${isAbout ? '' : 'reviews '}${gig.reviews.length})`}</span>
                    </div>
                    {isAbout && <span className='top-rated'> Top Rated: {gig.owner.rate}</span>}
                </div>
            </section>
        </section>
        {isAbout && <input type="button" value="Contact me" className='contact' />}
    </div>
}