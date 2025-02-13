import React from 'react'

import { NavLink } from "react-router-dom"

export function NavigationsAndActions({ gigCategory }) {

    const navigations = [{ to: '/', name: 'home' }, { to: `/${gigCategory}`, name: gigCategory }]

    return <div className="navigations-and-actions">

        <section className="navigations">
            {
                navigations.map(({ to, name }, index) => {
                    return <React.Fragment key={to}>

                        <NavLink to={to} className='link'> {index === 0 ? <img width={'20px'} src={'/images/home-icon.png'} /> : name}</NavLink>

                        <span className="path-symbol">/</span>
                    </React.Fragment>
                })
            }
        </section>

        <section className="actions">ACTIONS</section>

    </div>
}