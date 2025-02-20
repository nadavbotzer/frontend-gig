import { useState } from "react";


export function ReviewContent({ text }) {

    const [seeMore, setSeeMore] = useState(false)

    function onSeeMore() {
        setSeeMore(!seeMore)
    }

    return <div className="text">
        {text.length > 250 && seeMore && <><span>{text} </span><span className='more' onClick={onSeeMore}>See less</span></>}
        {text.length > 250 && !seeMore && <><span>{text.slice(0, 250)}... </span><span className='more' onClick={onSeeMore}>See more</span></>}
        {text.length < 250 && <span>{text}</span>}
    </div>
}