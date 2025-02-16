import React, { useState } from 'react'

import { NavLink } from "react-router-dom"

export function NavigationsAndActions({ gigCategory }) {

    const [ripples, setRipples] = useState([])
    const [isLiked, setIsLiked] = useState(false)

    const navigations = [{ to: '/', name: 'home' }, { to: `/${gigCategory}`, name: gigCategory }]

    function onClickLike(event) {
        setIsLiked(!isLiked)
        const { left, top } = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        setRipples((prev) => [...prev, { x, y, id: Date.now() }]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== Date.now()));
        }, 600);
    }

    return <div className="navigations-and-actions">

        <section className="navigations">
            {
                navigations.map(({ to, name }, index) => {
                    return <React.Fragment key={to}>
                        <NavLink to={to} className='link'>
                            {
                                index === 0 ?
                                    <img width={'20px'} src={'/images/home-icon.png'} /> :
                                    name
                            }
                        </NavLink>
                        <span className="path-symbol">/</span>
                    </React.Fragment>
                })
            }
        </section>

        <section className="actions">
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
    </div>
}