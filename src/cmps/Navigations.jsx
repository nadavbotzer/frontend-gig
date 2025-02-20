import React from 'react'

import { Link } from "react-router-dom"


export function Navigations({ gigCategory }) {

    const navigations = [{ to: '/', name: 'home' }, { to: `/gig/?tags=${gigCategory}`, name: parseTags(gigCategory) }]

    function parseTags(tags) {
        return tags
            .replace(/[\[\]]/g, '')
            .split(',')
            .map(tag =>
                tag.split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
            )
            .join(' and ')
    }

    return <section className="navigations">
        {
            navigations.map(({ to, name }, index) => {
                return <React.Fragment key={to}>
                    <Link to={to} className='link'>
                        {
                            index === 0 ?
                                <span className='icon-link'>
                                    <img width={'20px'} src={'/images/home-icon.png'} />
                                </span> :
                                name
                        }
                    </Link>
                    {index < navigations.length - 1 && <span className="path-symbol">/</span>}
                </React.Fragment>
            })
        }
    </section>
}