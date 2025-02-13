import { useState } from "react"

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

    const [img, setImg] = useState(null)

    function pickImage(src) {
        setImg(img ? null : src)
    }

    return <Carousel dynamicHeight showArrows className="carousel">
        {/* return <div className="gig-images"> */}
        {/* <div width={'300px'}> */}
        <img src={imgUrls[0]} className="carouselle-img" />
        {/* <p className="legend">Legend 1</p> */}
        {/* </div> */}
        {/* <div width={'300px'}> */}
        <img src={imgUrls[1]} className="carouselle-img" />
        {/* <p className="legend">Legend 2</p> */}
        {/* </div> */}
        {/* <div width={'300px'}> */}
        <img src={imgUrls[2]} className="carouselle-img" />
        {/* <p className="legend">Legend 3</p> */}
        {/* </div> */}
        {/* </div> */}
    </Carousel>
}