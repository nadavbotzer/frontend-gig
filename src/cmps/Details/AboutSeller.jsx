import { MiniUser } from "../MiniUser/MiniUser"
import { InfoSeller } from "./InfoSeller"

import '../../assets/styles/cmps/AboutSeller.scss'

export function AboutSeller({ reviewsCount, owner, location, createdAt, avgResponse, lastDeliveryAt, about, languagesArray }) {

    const title = `Get to know ${owner.fullname}`

    return <div className="about-seller">
        <h1>{title}</h1>
        <MiniUser
            isAbout={true}
            owner={owner}
            reviewsCount={reviewsCount}
        />
        <InfoSeller
            location={location}
            createdAt={createdAt}
            avgResponse={avgResponse}
            lastDeliveryAt={lastDeliveryAt}
            languagesArray={languagesArray}
            aboutSellerTxt={about}
        />
    </div>
}