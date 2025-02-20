import { Level } from '../Level.jsx';
import { ProfileImg } from './ProfileImg.jsx';
import { StatusOnline } from '../StatusOnline.jsx';

export function MiniUser({ isAbout, owner, reviewsCount }) {

    const { imgUrl, fullname, rate, level } = owner

    function createRatingStarString() {
        let stars = []
        for (let i = 0; i < rate; i++) {
            stars.push(<img className='icon' src='/images/star-dark-icon.png' key={i} />)
        }
        return stars;
    }

    const stars = createRatingStarString()

    return <div className={`mini-user ${!isAbout ? 'border-bottom' : ''}`}>

        <section className='profile-content'>

            <ProfileImg imgSrc={imgUrl} />

            <section className="about-user">

                <div className="about-user-row">
                    <span className="user-name">{fullname}</span>
                    {
                        isAbout ? <StatusOnline /> :
                            <Level level={rate} />
                    }
                </div>

                {
                    isAbout &&
                    <div className="about-user-row">
                        <span className="about-profession">{owner.proffession}</span>
                    </div>
                }

                <div className={`about-user-column`}>

                    {!isAbout && <span className="profession">{owner.proffession}</span>}

                    <div className="rating">
                        <div className="star-rating">
                            <span className='stars'>
                                {
                                    stars.map((star) => {
                                        return star
                                    })
                                }
                            </span>
                            <span className='number'>{rate}</span>
                        </div>
                        {!isAbout && <span className="reviews">({reviewsCount} reviews)</span>}
                        {isAbout && <span className="reviews">({reviewsCount})</span>}
                    </div>
                    {isAbout && <Level level={level} />}
                </div>
            </section>
        </section>
        {isAbout && <input type="button" value="Contact me" className='contact' />}
    </div>
}