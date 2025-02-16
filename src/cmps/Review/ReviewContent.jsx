import { useState } from "react";

import '../../assets/styles/cmps/ReviewContent.scss'

export function ReviewContent({ text }) {

    const [seeMore, setSeeMore] = useState(false)

    function onSeeMore() {
        setSeeMore(!seeMore)
    }

    return <div className="text">
        {seeMore && text.length > 250 ? text : text.slice(0, 250) + '... '}
        {text.length > 250 && <span className='more' onClick={onSeeMore}>{`${seeMore ? 'See less' : 'See more'}`}</span>}
    </div>
}