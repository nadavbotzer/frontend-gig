import { useState } from "react"

import Carousel from 'better-react-carousel'

export function GigImages() {

    const imgUrls = [
        '/images/img-1.jpg',
        '/images/img-2.jpg',
        '/images/img-3.jpg',
        '/images/img-4.jpg',
        '/images/img-5.jpg',
        '/images/img-6.jpg',
    ]

    const [img, setImg] = useState(null)

    function pickImage(src) {
        setImg(img ? null : src)
    }

    return <div className="gig-images">
        <Carousel cols={1} rows={1} gap={10} loop showDots>
            {
                imgUrls.map((src) => {
                    return <Carousel.Item key={src} onClick={() => pickImage(null)}>
                        <img width="70%" src={img ? img : src} />
                    </Carousel.Item>
                })
            }
        </Carousel>
        <Carousel cols={imgUrls.length} rows={1} gap={5} loop hideArrow>
            {
                imgUrls.map((src) => {
                    return <Carousel.Item key={src} >
                        <img src={src} onClick={() => pickImage(src)} />
                    </Carousel.Item>
                })
            }
        </Carousel>
    </div>
}