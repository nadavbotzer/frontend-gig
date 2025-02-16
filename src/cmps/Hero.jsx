
import SearchIcon from '@mui/icons-material/Search'


export function Hero() {
    return (


        <div className='hero'>
            <img className='verinica' src='https://tenner-w6u2.onrender.com/assets/verinica-6121f53c.png' />
            <img className='jordan' src='https://tenner-w6u2.onrender.com/assets/jordan-33dd6ded.png' />
            <img className='jenny' src='https://tenner-w6u2.onrender.com/assets/jenny-5727627d.png' />
            <img className='yuli' src='https://tenner-w6u2.onrender.com/assets/brurya-87d0bc25.png' />
            <img className='collin' src='https://tenner-w6u2.onrender.com/assets/collin-ec968bf2.png' />
            <div className='heading-wrapper'>
                <h1>Scale your professional</h1>
                <h1> workforce with <span>freelancers</span></h1>
            </div>
            <div className='box'>
                <div className='hero-search'>
                    <input type="search" placeholder='What service are you looking for today?'></input>
                    <button className='btn-search'>
                        <SearchIcon />
                    </button>
                </div>
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