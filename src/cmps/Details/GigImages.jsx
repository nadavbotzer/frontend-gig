import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";

export function GigImages({ imgUrls }) {
    return <Carousel dynamicHeight showArrows className="carousel">
        {
            imgUrls.map((src) => {
                return <img key={src} src={src} />
            })
        }
    </Carousel>
}