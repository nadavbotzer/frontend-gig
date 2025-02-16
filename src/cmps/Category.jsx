import { Item } from 'better-react-carousel'
import { useNavigate } from "react-router-dom"

export function Category() {
    const navigate = useNavigate()

    const categorys = [
        { txt: 'Programming & Tech', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech-thin.56382a2.svg' },
        { txt: 'Graphics & Design', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design-thin.ff38893.svg' },
        { txt: 'Digital Marketing', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing-thin.68edb44.svg' },
        { txt: 'Writing & Translation', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation-thin.fd3699b.svg' },
        { txt: 'Video & Animation', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation-thin.9d3f24d.svg' },
        { txt: 'AI Services', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services-thin.104f389.svg' },
        { txt: 'Music & Audio', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio-thin.43a9801.svg' },
        { txt: 'Business', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business-thin.885e68e.svg' },
        { txt: 'Consultin', src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting-thin.d5547ff.svg' },
    ]

    function goToIndex(tag) {
        navigate(`/gig/?tags=[${tag}]`)

    }
    return (
        <section className='category'>
            {categorys.map((category, index) => {
                return (
                    <item key={index} onClick={() => goToIndex(category.txt)}>
                        <div className='cat-content'>
                            {/* {isHomePage && ( */}
                            <div className='cat-img'>
                                <img src={category.src} alt={category.txt} />
                            </div>
                            {/* )} */}
                            <p>{category.txt}</p>
                        </div>
                    </item>
                )
            })}


        </section>
    )
}





