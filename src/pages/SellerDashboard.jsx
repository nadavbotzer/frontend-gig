import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, addOrder, updateOrder, removeOrder, addOrderMsg } from '../store/actions/order.actions'

export function SellerDashboard() {
    const orders = useSelector(storeState => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders()
    }, [])

    return (
        <div>{ }</div>
    )

}