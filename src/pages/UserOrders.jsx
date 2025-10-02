import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { userService } from '../services/user'
import { LoadingSpinner } from '../cmps/LoadingSpinner'
import { Level } from '../cmps/Level'
import { Link } from 'react-router-dom'

// MUI Icons
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import StarIcon from '@mui/icons-material/Star'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

export function UserOrders() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const user = userService.getLoggedinUser()
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [filteredOrders, setFilteredOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState('all')
    
    useEffect(() => {
        if (user) {
            loadOrders({ buyer: user._id }).finally(() => setIsInitialLoad(false))
        }
    }, [user])

    useEffect(() => {
        if (statusFilter === 'all') {
            setFilteredOrders(orders)
        } else {
            setFilteredOrders(orders.filter(order => order.status === statusFilter))
        }
    }, [orders, statusFilter])

    const getStatusIcon = (status) => {
        switch(status) {
            case 'pending': return <PendingIcon className="status-icon pending" />
            case 'approve': return <CheckCircleIcon className="status-icon approved" />
            case 'deliver': return <LocalShippingIcon className="status-icon delivered" />
            case 'reject': return <CancelIcon className="status-icon rejected" />
            default: return <PendingIcon className="status-icon default" />
        }
    }

    const getStatusClass = (status) => {
        switch(status) {
            case 'pending': return 'status-pending'
            case 'approve': return 'status-approved'
            case 'deliver': return 'status-delivered'
            case 'reject': return 'status-rejected'
            default: return 'status-default'
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        })
    }

    const calculateDueDate = (createdAt, deliveryTime) => {
        if (!createdAt || !deliveryTime) return 'N/A'
        
        const orderDate = new Date(createdAt)
        const dueDate = new Date(orderDate.getTime() + (deliveryTime * 24 * 60 * 60 * 1000))
        
        return dueDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getDaysRemaining = (createdAt, deliveryTime) => {
        if (!createdAt || !deliveryTime) return null
        
        const orderDate = new Date(createdAt)
        const dueDate = new Date(orderDate.getTime() + (deliveryTime * 24 * 60 * 60 * 1000))
        const today = new Date()
        const diffTime = dueDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        return diffDays
    }

    const getOrderStats = () => {
        const totalOrders = orders.length
        const pendingOrders = orders.filter(order => order.status === 'pending').length
        const completedOrders = orders.filter(order => order.status === 'deliver').length
        const totalSpent = orders.reduce((sum, order) => sum + (order.packageDeal?.total || 0), 0)
        
        return { totalOrders, pendingOrders, completedOrders, totalSpent }
    }

    const handleRefreshOrders = () => {
        if (user) {
            loadOrders({ buyer: user._id }).finally(() => setIsInitialLoad(false))
        }
    }

    const stats = getOrderStats()

    if (isLoading && isInitialLoad) {
        return <LoadingSpinner message="Loading your orders..." size="large" />
    }

    return (
        <main className="user-orders">
            <header className="orders-header">
                <div className="header-content">
                    <div className="header-title">
                        <ShoppingBagIcon className="header-icon" />
                        <h1>My Orders<span>.</span></h1>
                    </div>
                    <p>Track and manage all your purchased services</p>
                    <button onClick={handleRefreshOrders} className="btn btn-outline refresh-btn">
                        Refresh Orders
                    </button>
                </div>
            </header>

            {/* Statistics Cards */}
            <section className="orders-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <ShoppingBagIcon />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalOrders}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon pending">
                        <PendingIcon />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.pendingOrders}</h3>
                        <p>Pending</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon completed">
                        <CheckCircleIcon />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.completedOrders}</h3>
                        <p>Completed</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon money">
                        <AttachMoneyIcon />
                    </div>
                    <div className="stat-content">
                        <h3>${stats.totalSpent.toFixed(2)}</h3>
                        <p>Total Spent</p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="orders-filter">
                <div className="filter-header">
                    <h2>Your Orders</h2>
                    <div className="filter-tabs">
                        <button 
                            className={`filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('all')}
                        >
                            All ({orders.length})
                        </button>
                        <button 
                            className={`filter-tab ${statusFilter === 'pending' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('pending')}
                        >
                            Pending ({stats.pendingOrders})
                        </button>
                        <button 
                            className={`filter-tab ${statusFilter === 'deliver' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('deliver')}
                        >
                            Completed ({stats.completedOrders})
                        </button>
                    </div>
                </div>
            </section>

            {/* Orders List */}
            <section className="orders-list-section">
                {filteredOrders.length === 0 ? (
                    <div className="no-orders">
                        <ShoppingBagIcon className="no-orders-icon" />
                        <h3>No orders found</h3>
                        <p>
                            {statusFilter === 'all' 
                                ? "You haven't made any orders yet. Start exploring our amazing services!"
                                : `No ${statusFilter} orders found.`
                            }
                        </p>
                        <Link to="/gig" className="btn btn-primary">
                            Browse Services
                        </Link>
                    </div>
                ) : (
                    <div className="orders-grid">
                        {filteredOrders.map(order => {
                            const daysRemaining = getDaysRemaining(order.createdAt, order.packageDeal?.deliveryTime)
                            
                            return (
                                <div key={order._id} className="order-card">
                                    <div className="order-header">
                                        <div className="order-id">
                                            <span className="order-number">#{order._id.slice(-6).toUpperCase()}</span>
                                            <span className="order-date">{formatDate(order.createdAt)}</span>
                                        </div>
                                        <div className={`order-status ${getStatusClass(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                                        </div>
                                    </div>

                                    <div className="order-content">
                                        <div className="gig-info">
                                            <h3 className="gig-title">{order.packageDeal?.title || 'Gig Title'}</h3>
                                            <p className="package-type">{order.packageDeal?.packageType?.toUpperCase() || 'BASIC'} Package</p>
                                        </div>

                                        <div className="seller-info">
                                            <img 
                                                src={order.seller?.imgUrl || '/images/profile-default.png'} 
                                                alt={order.seller?.fullname || 'Seller'} 
                                                className="seller-avatar"
                                            />
                                            <div className="seller-details">
                                                <span className="seller-name">{order.seller?.fullname || 'Seller Name'}</span>
                                                <div className="seller-level">
                                                    <Level level={order.seller?.level || 1} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="order-details">
                                            <div className="detail-item">
                                                <CalendarTodayIcon className="detail-icon" />
                                                <div className="detail-content">
                                                    <span className="detail-label">Due Date</span>
                                                    <span className="detail-value">
                                                        {calculateDueDate(order.createdAt, order.packageDeal?.deliveryTime)}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {daysRemaining !== null && (
                                                <div className="detail-item">
                                                    <div className="detail-content">
                                                        <span className={`days-remaining ${daysRemaining <= 1 ? 'urgent' : daysRemaining <= 3 ? 'warning' : 'normal'}`}>
                                                            {daysRemaining > 0 ? `${daysRemaining} days left` : 
                                                             daysRemaining === 0 ? 'Due today' : 
                                                             `${Math.abs(daysRemaining)} days overdue`}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="order-price">
                                            <span className="price-label">Total</span>
                                            <span className="price-value">${order.packageDeal?.total || 0}</span>
                                        </div>
                                    </div>

                                    <div className="order-actions">
                                        <Link 
                                            to={`/gig/${order.gig?._id}`} 
                                            className="btn btn-outline"
                                        >
                                            View Gig
                                        </Link>
                                        <Link 
                                            to={`/gig/confirmationpage/${order._id}`} 
                                            className="btn btn-primary"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </section>
        </main>
    )
}
