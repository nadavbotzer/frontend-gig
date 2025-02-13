import { GigHeader } from "./GigHeader";
import { GigImages } from "./GigImages";

export function GigInfo({ gig }) {
    return <section className="gig-info-column">
        <GigHeader title={'My interior design project using 3d tech'} gig={gig} />
        <GigImages />
    </section>
}