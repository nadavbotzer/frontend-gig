import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, addOrder, updateOrder } from '../store/actions/order.actions'
import { OrderList } from '../cmps/OrderList'

export function SellerDashboard() {
    const orders = useSelector(storeState => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders()
    }, [])

    return (
        <OrderList orders={orders} />
    )

}