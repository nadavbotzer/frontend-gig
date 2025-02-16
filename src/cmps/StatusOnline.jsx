import React from 'react'

import '../assets/styles/cmps/StatusOnline.scss'

export function StatusOnline() {

    //* this info will probably come from store
    const isOnline = true
    const text = 'Online'

    return <React.Fragment>
        {
            isOnline && <span className="online-status">
                <img src='/images/green-circle-icon.png' />
                {text}
            </span>
        }
    </React.Fragment>
}