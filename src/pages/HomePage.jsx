import { CategoryList } from '../cmps/CategoryList'
import { Hero } from '../cmps/Hero'
import { HomeVideo } from '../cmps/HomeVideo'
import { MakeIt } from '../cmps/MakeIt'
import { JoinTopGig } from '../cmps/JoinTopGig'
import { userService } from '../services/user'

userService.getLoggedinUser()
export function HomePage() {

    return (
        <section className='home-page'>
            <Hero />
            <CategoryList />
            <HomeVideo />
            <MakeIt />
            {!userService.getLoggedinUser() && <JoinTopGig />}
        </section >
    )
}

