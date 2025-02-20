import React from 'react'

import { Actions } from './Details/Actions'
import { Navigations } from './Navigations'

export function NavigationsAndActions({ gigCategory, showActions, gig, setGig }) {
    return <div className="navigations-and-actions">
        <Navigations gigCategory={gigCategory} />
        {showActions && <Actions gigCategory={gigCategory} gig={gig} setGig={setGig} />}
    </div>
}