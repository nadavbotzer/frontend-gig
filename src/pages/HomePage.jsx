import { CategoryList } from '../cmps/CategoryList'
import { Hero } from '../cmps/Hero'
import { HomeVideo } from '../cmps/HomeVideo'
import { MakeIt } from '../cmps/MakeIt'
import { JoinFiverr } from '../cmps/JoinFiverr'

export function HomePage() {
    return (
        <section className='home-page'>
            <Hero />
            <CategoryList />
            <HomeVideo />
            <MakeIt />
            <JoinFiverr />
        </section >
    )
}

