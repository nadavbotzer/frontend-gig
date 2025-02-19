const { DEV, VITE_LOCAL } = import.meta.env

import { userService } from '../user'
import { makeId } from '../util.service'
import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

export function getEmptyOrder() {
    const loggedInUser = userService.getLoggedinUser()
    return {
        _id: makeId(),
        buyer: loggedInUser,
        seller: '',
        gig: {              // mini-order

        },
        status: 'created',
    }
}

// Helpers

function getDefaultFilter() {
    return {
        txt: '',
        price: {
            min: '',
            max: '',
        },
        sortField: '',
        sortDir: '',
        tags: [],
        deliveryTime: ''
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { getEmptyOrder, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService
