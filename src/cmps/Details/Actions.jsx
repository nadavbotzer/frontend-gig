import { useState } from 'react';

import '../../assets/styles/cmps/Actions.scss';

export function Actions() {

    const [ripples, setRipples] = useState([])
    const [isLiked, setIsLiked] = useState(false)

    function onClickLike(event) {
        setIsLiked(!isLiked)
        const { left, top } = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - left
        const y = event.clientY - top

        setRipples((prev) => [...prev, { x, y, id: Date.now() }])

        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== Date.now()))
        }, 600)
    }

    return <section className="actions">
        <div className="like">
            <div className="image-container" onClick={(event) => onClickLike(event)}>
                <img
                    className={`${isLiked ? "clicked" : ""}`}
                    src={!isLiked ? '/images/heart-icon.png' : '/images/red-heart-icon.png'}
                />
                {
                    ripples.map(({ x, y, id }) => {
                        return <span
                            key={id}
                            className="ripple"
                            style={{ top: y - 9, left: x - 9 }}
                        />
                    })
                }
            </div>
            <span className='amount-likes'>{5}</span>
        </div>
    </section>
}