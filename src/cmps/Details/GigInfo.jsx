import { GigHeader } from "./GigHeader";
import { GigImages } from "./GigImages";

export function GigInfo() {
    return <section className="gig-info-column">
        <GigHeader />
        <GigImages />
    </section>
}