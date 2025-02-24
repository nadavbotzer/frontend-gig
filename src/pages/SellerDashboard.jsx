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
                <h1>Manage Orders<span>.</span></h1>
            </header>
            <div className="graph-wrapper">
                {!!orders.length && <DashboardGraph orders={orders} />}
            </div>
            <div className="order-list-wrapper">
                <OrderList orders={orders} />
            </div>
        </main>
    )

}