import '../assets/styles/cmps/MiniUser.scss'

export function MiniUser() {
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

    return <div className="mini-user">

        <section className="profile">
            <img className="profile-img" src={gig.owner.imgUrl || '/images/profile-default.png'} />
        </section>

        <section className="about-user">

            <div className="about-user-row">
                <span className="user-name">{gig.owner.fullname}</span>
                <span className='top-rated'> Top Rated: {gig.owner.rate}</span>
            </div>

            <div className="about-user-row">

                <span className="profession">About the user</span>

                <div className="star-rating">
                    <span className='stars'>
                        <img width={'20px'} src={'/images/star-icon.png'} />
                        <img width={'20px'} src={'/images/star-icon.png'} />
                        <img width={'20px'} src={'/images/star-icon.png'} />
                        <img width={'20px'} src={'/images/star-icon.png'} />
                        <img width={'20px'} src={'/images/star-icon.png'} />
                    </span>
                    <span className='number'>{gig.owner.rate}</span>
                    <span className="reviews">{`(reviews ${gig.reviews.length})`}</span>
                </div>
            </div>

        </section>

    </div>
}