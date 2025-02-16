import React, { useState, useEffect, useRef } from 'react';

export function HomeVideo() {

    const [isInView, setIsInView] = useState(false);
    const videoRef = useRef(null);

    function checkIfInView() {
        const videoElement = videoRef.current
        if (videoElement) {
            const rect = videoElement.getBoundingClientRect();
            const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
            setIsInView(inView);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkIfInView);
        checkIfInView()
        return () => {
            window.removeEventListener('scroll', checkIfInView);
        };
    }, []);

    useEffect(() => {
        if (isInView) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isInView]);


    return (
        <section className='video'>
            <p className='bigger'>What success on Fiverr looks like</p>
            <p>Vontélle Eyewear turns to Fiverr freelancers to bring their vision to life.</p>
            <video ref={videoRef}
                width="100%" controls autoplay muted preload="auto"
            >
                <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9" type="video/mp4" />
            </video>
        </section>
    )
}