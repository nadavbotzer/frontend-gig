import { CategoryList } from '../cmps/CategoryList'
import { Hero } from '../cmps/Hero'
import { HomeVideo } from '../cmps/HomeVideo'
import { MakeIt } from '../cmps/MakeIt'
import { JoinTopGig } from '../cmps/JoinTopGig'

export function HomePage() {
    return (
        <section className='home-page'>
            <Hero />
            <CategoryList />
            <HomeVideo />
            <MakeIt />
            <JoinTopGig />
        </section >
    )
}

