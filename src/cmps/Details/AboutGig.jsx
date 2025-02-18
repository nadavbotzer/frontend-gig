import { makeId } from '../../services/util.service';

import '../../assets/styles/cmps/AboutGig.scss';

export function AboutGig({ descriptionContent }) {

    const title = 'About this gig'
    
    return <div className="about">
        <h2>{title}</h2>
        <div className="content">
            {
                descriptionContent.map((par) => {
                    return <p key={makeId()}>{par}</p>
                })
            }
        </div>
    </div>
}