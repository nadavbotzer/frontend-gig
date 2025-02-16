import { Item } from 'better-react-carousel'
import { Link, useNavigate, useParams } from "react-router-dom"

export function Category() {
    const navigate = useNavigate()

    const categorys = [
        { txt: 'Programming & Tech', tags: ['programming', 'tech'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech-thin.56382a2.svg' },
        { txt: 'Graphics & Design', tags: ['graphics', 'design'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design-thin.ff38893.svg' },
        { txt: 'Digital Marketing', tags: ['digital-marketing'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing-thin.68edb44.svg' },
        { txt: 'Writing & Translation', tags: ['writing', 'translation'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation-thin.fd3699b.svg' },
        { txt: 'Video & Animation', tags: ['video', 'animation'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation-thin.9d3f24d.svg' },
        { txt: 'AI Services', tags: ['ai-services'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services-thin.104f389.svg' },
        { txt: 'Music & Audio', tags: ['music', 'audio'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio-thin.43a9801.svg' },
        { txt: 'Business', tags: ['business'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business-thin.885e68e.svg' },
        { txt: 'Consultin', tags: ['consultin'], src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting-thin.d5547ff.svg' },
    ]

    function goToIndex(tags) {
        navigate(`/gig/?tags=[${tags.join(',')}]`)

    }

    return (
        <section className='category'>
            {categorys.map((category, index) => {
                return (
                    <article key={index} onClick={() => goToIndex(category.tags)}>
                        <div className='cat-content'>
                            <div className='cat-img'>
                                <img src={category.src} alt={category.txt} />
                            </div>
                            <p>{category.txt}</p>
                        </div>
                    </article>
                )
            })}


        </section>
    )
}





