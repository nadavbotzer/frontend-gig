import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, addOrder, updateOrder } from '../store/actions/order.actions'
import { OrderList } from '../cmps/OrderList'
import { userService } from '../services/user'
import { DashboardGraph } from '../cmps/DashboardGraph'

export function SellerDashboard() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const user = userService.getLoggedinUser()
    useEffect(() => {
        loadOrders({ owner: user })
    }, [])

    return (
        <main className="seller-dashboard">
            <header className="dashboard-header">
                <h1>Order Managment<span>.</span></h1>
            </header>
            <div className="graph-wrapper">
                <h1>Statistics</h1>
                {!!orders.length && <DashboardGraph orders={orders} />}
            </div>
            <div className="order-list-wrapper">
                <h1 className="list-heading">Orders</h1>
                <OrderList orders={orders} />
            </div>
        </main>
    )

}