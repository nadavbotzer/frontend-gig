import { Category } from '../cmps/Category';
import { Hero } from '../cmps/Hero';
import { HomeVideo } from '../cmps/HomeVideo';
import { MakeIt } from '../cmps/MakeIt';



export function HomePage() {
    return (
        <section className='home-page'>
            <Hero />
            <Category />
            <HomeVideo />
            <MakeIt />



        </section >
    )
}

