import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";

export function GigImages() {

    const imgUrls = [
        '/images/img-1.jpg',
        '/images/img-2.jpg',
        '/images/img-3.jpg',
        '/images/img-4.jpg',
        '/images/img-5.jpg',
        '/images/img-6.jpg',
    ]

    return <Carousel dynamicHeight showArrows className="carousel">
        {
            imgUrls.map((src) => {
                return <img key={src} src={src} />
            })
        }
    </Carousel>
}