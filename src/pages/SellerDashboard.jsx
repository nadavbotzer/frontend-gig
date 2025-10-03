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
    const [sortBy, setSortBy] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')
    
    useEffect(() => {
        loadOrders({ owner: user, sortBy, sortOrder }).finally(() => setIsInitialLoad(false))
    }, [sortBy, sortOrder])

    const handleSort = (field) => {
        if (sortBy === field) {
            // Toggle sort order if same field
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            // Set new field and default to ascending
            setSortBy(field)
            setSortOrder('asc')
        }
    }

    const handleRemoveSort = () => {
        setSortBy(null)
        setSortOrder('asc')
    }

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
                    <div className="header-actions">
                        <span className="order-count">{orders.length} total orders</span>
                        {sortBy && (
                            <button 
                                className="remove-sort-btn"
                                onClick={handleRemoveSort}
                                title="Remove sorting"
                            >
                                Clear Sort
                            </button>
                        )}
                    </div>
                </div>
                {isLoading && isInitialLoad ? (
                    <LoadingSpinner message="Loading orders..." size="large" />
                ) : (
                    <OrderList 
                        orders={orders} 
                        onSort={handleSort}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                    />
                )}
            </div>
        </main>
    )

}