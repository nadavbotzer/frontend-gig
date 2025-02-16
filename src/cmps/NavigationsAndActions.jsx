import React from 'react'

import { Actions } from './Details/Actions'
import { Navigations } from './Navigations'

import '../assets/styles/cmps/NavigationsAndActions.scss'

export function NavigationsAndActions({ gigCategory, showActions }) {

    return <div className="navigations-and-actions">
        <Navigations gigCategory={gigCategory} />
        {showActions && <Actions gigCategory={gigCategory} />}
    </div>
}