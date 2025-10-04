const { DEV, VITE_LOCAL } = import.meta.env

import { userService } from '../user'
import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

export function getEmptyOrder() {
    const loggedInUser = userService.getLoggedinUser()
    const buyerId = loggedInUser?._id || loggedInUser
    return {
        buyer: buyerId,
        seller: '',
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

// Add buyer population wrapper only for local service
const originalQuery = service.query
service.query = async function(filterBy) {
    // Add excludeCreated parameter to filter out created orders at backend level
    const filterWithExclusion = {
        ...filterBy,
        excludeCreated: true
    }
    
    const orders = await originalQuery.call(this, filterWithExclusion)
    
    // Only populate buyer info for local service where we have access to user data
    if (VITE_LOCAL === 'true') {
        return await populateBuyerInfo(orders)
    }
    
    // For remote service, return orders as-is (backend should filter out created orders)
    return orders
}

// Populate buyer and seller info only for local development
async function populateBuyerInfo(orders) {
    try {
        const { storageService } = await import('../async-storage.service')
        const users = await storageService.query('user')
        const userMap = new Map(users.map(user => [user._id, user]))
        
        return orders.map(order => {
            let updatedOrder = { ...order }
            
            // If buyer is a string ID, populate it with user data
            if (typeof order.buyer === 'string') {
                const buyerUser = userMap.get(order.buyer)
                if (buyerUser) {
                    updatedOrder.buyer = {
                        _id: buyerUser._id,
                        fullname: buyerUser.fullname,
                        username: buyerUser.username,
                        imgUrl: buyerUser.imgUrl,
                        level: buyerUser.level,
                        rate: buyerUser.rate
                    }
                }
            }
            
            // If seller is a string ID, populate it with user data
            if (typeof order.seller === 'string') {
                const sellerUser = userMap.get(order.seller)
                if (sellerUser) {
                    updatedOrder.seller = {
                        _id: sellerUser._id,
                        fullname: sellerUser.fullname,
                        username: sellerUser.username,
                        imgUrl: sellerUser.imgUrl,
                        level: sellerUser.level,
                        rate: sellerUser.rate
                    }
                }
            }
            
            return updatedOrder
        })
    } catch (error) {
        console.error('❌ Failed to populate user info:', error)
        return orders
    }
}

export const orderService = { getEmptyOrder, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService
