
import React, { useRef, useEffect } from 'react'
import { useScrollContext } from './ScrollProvider'
import { SearchBar } from './SearchBar'

export function Hero() {
    const heroRef = useRef(null)
    const inputRef = useRef(null)
    const { setIsInputInView, setIsInputVisible } = useScrollContext()

    useEffect(() => {
        window.addEventListener('scroll', checkInputInView)
        return () => {
            window.removeEventListener('scroll', checkInputInView)
        }
    }, [])

    const checkInputInView = () => {
        const inputElement = inputRef.current
        if (inputElement) {
            const rect = inputElement.getBoundingClientRect()
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                setIsInputInView(true)
                setIsInputVisible(true)
            } else {
                setIsInputInView(false)
            }
        }
    }

    return (

        <div ref={heroRef} className='hero'>
            <img className='verinica display-none' src='https://tenner-w6u2.onrender.com/assets/verinica-6121f53c.png' />
            <img className='jordan display-none' src='https://tenner-w6u2.onrender.com/assets/jordan-33dd6ded.png' />
            <img className='jenny display-none' src='https://tenner-w6u2.onrender.com/assets/jenny-5727627d.png' />
            <img className='yuli display-none' src='https://tenner-w6u2.onrender.com/assets/brurya-87d0bc25.png' />
            <img className='collin display-none' src='https://tenner-w6u2.onrender.com/assets/collin-ec968bf2.png' />
            <div className='heading-wrapper'>
                <h1>Scale your professional</h1>
                <h1> workforce with <span>freelancers</span></h1>
            </div>
            <div className='box'>
                <form ref={inputRef} className='hero-search'>
                    <SearchBar placeholder={'Search for any service...'} isBtnInline={true} />
                </form>
            </div>
            <section className='hero-imgs'>
                <span className='trusted-by'>Trusted by:</span>
                <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.ff37dd3.svg' />
                <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.e74f4d9.svg' />
                <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.b310314.svg' />
                <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.22fca85.svg' />
                <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.0520267.svg' />
                <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.7c1170d.svg' />
            </section>
        </div>

    )
}