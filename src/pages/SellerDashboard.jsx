import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, addOrder, updateOrder } from '../store/actions/order.actions'
import { OrderList } from '../cmps/OrderList'
import { userService } from '../services/user'

export function SellerDashboard() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const user = userService.getLoggedinUser()
    useEffect(() => {
        loadOrders({ owner: user })
    }, [])

    return (
        <OrderList orders={orders} />
    )

}