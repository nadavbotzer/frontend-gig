import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, addOrder, updateOrder } from '../store/actions/order.actions'
import { OrderList } from '../cmps/OrderList'
import { SellerStatistics } from '../cmps/SellerStatistics'
import { userService } from '../services/user'
import { DashboardGraph } from '../cmps/DashboardGraph'
import { LoadingSpinner } from '../cmps/LoadingSpinner'

export function SellerDashboard() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const user = userService.getLoggedinUser()
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    
    useEffect(() => {
        loadOrders({ owner: user }).finally(() => setIsInitialLoad(false))
    }, [])

    return (
        <main className="seller-dashboard">
            <header className="dashboard-header">
                <h1>Seller Dashboard<span>.</span></h1>
                <p>Manage your orders and track your performance</p>
            </header>

            {!isLoading && !isInitialLoad && (
                <SellerStatistics orders={orders} />
            )}

            <div className="order-list-wrapper">
                <div className="section-header">
                    <h2>Recent Orders</h2>
                    <span className="order-count">{orders.length} total orders</span>
                </div>
                {isLoading && isInitialLoad ? (
                    <LoadingSpinner message="Loading orders..." size="large" />
                ) : (
                    <OrderList orders={orders} />
                )}
            </div>
        </main>
    )

}