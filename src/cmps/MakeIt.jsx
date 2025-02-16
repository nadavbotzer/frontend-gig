export function MakeIt() {

    const makeItems = [
        { txt: 'Access a pool of top talent across 700 categories', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/categories.8badf97.svg' },
        { txt: 'Enjoy a simple, easy-to-use matching experience', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/matching.0eef7cc.svg' },
        { txt: 'Get quality work done quickly and within budget', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/quickly.6879514.svg' },
        { txt: 'Only pay when you’re happy', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/happy.42ed7bd.svg' },
    ]
    return (
        <section className='make-it'>
            <p className='bigger'>Make it all happen with freelancers</p>
            <section className='make-items'>

                {makeItems.map((item, index) => {
                    return (
                        <article key={index}>
                            <img src={item.src} alt={item.txt} />
                            <p>{item.txt}</p>
                        </article>
                    )
                })}
            </section>
        </section >
    )
}