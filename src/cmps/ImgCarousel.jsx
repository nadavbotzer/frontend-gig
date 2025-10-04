import { useEffect, useRef, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export function ImgCarousel({ imgUrls, onClickImg, withImgPreview = false }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const elCarousel = useRef(null)
    const isNavigatingByDot = useRef(false)
    
    // Ensure imgUrls is always an array
    const safeImgUrls = imgUrls || []

    useEffect(() => {
        setCurrentImageIndex(0)
    }, [safeImgUrls])

    useEffect(() => {
        const options = {
            root: elCarousel.current,
            rootMargin: '0px',
            threshold: 0.5,
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.getAttribute('data-idx') || '0')
                    setCurrentImageIndex(idx)
                }
            })
        }, options)

        document.querySelectorAll('.carousel-item-container').forEach(el => observer.observe(el))

        return () => {
            observer.disconnect()
        }
    }, [])

    function handleNext() {
        const isLastIndex = currentImageIndex === safeImgUrls.length - 1
        if (!isLastIndex) {
            scrollToImage(currentImageIndex + 1)
        }
    }

    function handlePrev() {
        const isFirstIndex = currentImageIndex === 0
        if (!isFirstIndex) {
            scrollToImage(currentImageIndex - 1)
        }
    }

    function handleDotClick(idx) {
        isNavigatingByDot.current = true
        scrollToImage(idx)
    }

    function scrollToImage(idx) {
        const itemWidth = elCarousel.current?.offsetWidth || 0 // Width of a single item
        const scrollPosition = idx * itemWidth // Scroll position of the container
        elCarousel.current?.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        })
    }

    function handleScroll() {
        if (elCarousel.current && elCarousel.current.scrollLeft % elCarousel.current.offsetWidth === 0) {
            isNavigatingByDot.current = false
        }
    }

    // Don't render carousel if no images
    if (safeImgUrls.length === 0) {
        return (
            <div className='img-carousel'>
                <div className='images-container'>
                    <div className='carousel-item-container'>
                        <img src="/images/default-image.jpg" alt="No images available" onClick={onClickImg} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='img-carousel'>
                <div ref={elCarousel} className='images-container' onScroll={handleScroll}>
                    {safeImgUrls.map((imgUrl, idx) => (
                        <div key={'i' + idx} data-idx={idx} className='carousel-item-container'>
                            <img src={imgUrl} alt={`Image ${idx}`} onClick={onClickImg} />
                        </div>
                    ))}
                </div>
                <div
                    className={`arrow-right ${currentImageIndex === safeImgUrls.length - 1 ? 'hidden' : ''}`}
                    onClick={handleNext}
                >
                    {<KeyboardArrowRightIcon />}
                </div>
                <div className={`arrow-left ${currentImageIndex === 0 ? 'hidden' : ''}`} onClick={handlePrev}>
                    {<KeyboardArrowLeftIcon />}
                </div>
                <div className='dots-pagination'>
                    {safeImgUrls.map((_, idx) => (
                        <div
                            onClick={() => handleDotClick(idx)}
                            key={'p' + idx}
                            className={`${currentImageIndex === idx ? 'active' : ''}`}
                        ></div>
                    ))}
                </div>
            </div>
            {withImgPreview &&
                <div className='img-previews'>
                    {
                        safeImgUrls.map((imgUrl, idx) => (
                            <div key={idx} className={`img-preview ${currentImageIndex === idx ? 'active' : ''}`}>
                                <img src={imgUrl} alt={`Image ${idx}`} onClick={() => scrollToImage(idx)} />
                            </div>
                        )
                        )
                    }
                </div>}
        </>
    )
}