import { MiniUser } from "../MiniUser/MiniUser"
import { InfoSeller } from "./InfoSeller"

import '../../assets/styles/cmps/AboutSeller.scss'

export function AboutSeller({ username, location, createdAt, avgResponseStr, lastDeliveryAt, languagesArray }) {

    const title = `Get to know ${username}`

    return <div className="about-seller">
        <h1>{title}</h1>
        <MiniUser isAbout={true} />
        <InfoSeller
            location={location}
            createdAt={createdAt}
            avgResponseStr={avgResponseStr}
            lastDeliveryAt={lastDeliveryAt}
            languagesArray={languagesArray}
        />
    </div>
}