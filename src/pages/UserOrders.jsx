import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { userService } from '../services/user'
import { saveToStorage, loadFromStorage } from '../services/util.service'
import { LoadingSpinner } from '../cmps/LoadingSpinner'
import { Level } from '../cmps/Level'
import { OrderList } from '../cmps/OrderList'
import { Link } from 'react-router-dom'

// MUI Icons
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import StarIcon from '@mui/icons-material/Star'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import BlockIcon from '@mui/icons-material/Block'
import CreateIcon from '@mui/icons-material/Create'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewListIcon from '@mui/icons-material/ViewList'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

export function UserOrders() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const user = userService.getLoggedinUser()
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [filteredOrders, setFilteredOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState('all')
    const [viewMode, setViewMode] = useState(() => {
        // Load saved view mode from storage service, default to 'cards'
        const savedViewMode = loadFromStorage('userOrdersViewMode')
        return savedViewMode || 'cards'
    }) // 'cards' or 'list'
    const [sortBy, setSortBy] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')
    
    useEffect(() => {
        if (user?._id) {
            loadOrders({ buyer: user._id }).finally(() => setIsInitialLoad(false))
        }
    }, [user?._id])

    useEffect(() => {
        let filtered = orders

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter)
        }

        // Apply sorting
        if (sortBy) {
            filtered = sortOrdersClientSide(filtered, sortBy, sortOrder)
        }

        setFilteredOrders(filtered)
    }, [orders, statusFilter, sortBy, sortOrder])

    const getStatusIcon = (status) => {
        switch(status) {
            case 'pending': return <HourglassEmptyIcon className="status-icon pending" />
            case 'approve': 
            case 'approved': return <CheckCircleIcon className="status-icon approved" />
            case 'deliver': 
            case 'delivered': return <LocalShippingIcon className="status-icon delivered" />
            case 'reject': 
            case 'rejected': return <BlockIcon className="status-icon rejected" />
            case 'completed': return <TaskAltIcon className="status-icon completed" />
            case 'cancelled': return <CancelIcon className="status-icon cancelled" />
            case 'created': return <CreateIcon className="status-icon created" />
            default: return <PendingIcon className="status-icon default" />
        }
    }

    const getStatusClass = (status) => {
        switch(status) {
            case 'pending': return 'status-pending'
            case 'approve': 
            case 'approved': return 'status-approved'
            case 'deliver': 
            case 'delivered': return 'status-delivered'
            case 'reject': 
            case 'rejected': return 'status-rejected'
            case 'completed': return 'status-completed'
            case 'cancelled': return 'status-cancelled'
            case 'created': return 'status-created'
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

    const sortOrdersClientSide = (orders, sortBy, sortOrder) => {
        return [...orders].sort((a, b) => {
            let aValue, bValue

            switch (sortBy) {
                case 'price':
                    aValue = a.packageDeal?.total || 0
                    bValue = b.packageDeal?.total || 0
                    break
                case 'dueDate':
                    aValue = getDueDate(a.createdAt, a.packageDeal?.deliveryTime)
                    bValue = getDueDate(b.createdAt, b.packageDeal?.deliveryTime)
                    break
                case 'status':
                    aValue = getStatusOrder(a.status)
                    bValue = getStatusOrder(b.status)
                    break
                default:
                    return 0
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
            return 0
        })
    }

    const getDueDate = (createdAt, deliveryTime) => {
        if (!createdAt || !deliveryTime) return new Date(0)
        const orderDate = new Date(createdAt)
        return new Date(orderDate.getTime() + (deliveryTime * 24 * 60 * 60 * 1000))
    }

    const getStatusOrder = (status) => {
        const statusOrder = {
            'pending': 1,
            'approve': 2,
            'approved': 2,
            'deliver': 3,
            'delivered': 3,
            'completed': 4,
            'reject': 5,
            'rejected': 5,
            'cancelled': 6,
            'created': 7
        }
        return statusOrder[status] || 999
    }

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

    const stats = getOrderStats()

    if (isLoading && isInitialLoad) {
        return <LoadingSpinner message="Loading your orders..." size="large" fullPage />
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
                    <div className="filter-controls">
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
                        
                        <div className="view-toggle">
                            <span className="view-label">View:</span>
                            <div className="radio-group">
                                <label className={`radio-option ${viewMode === 'cards' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="viewMode"
                                        value="cards"
                                        checked={viewMode === 'cards'}
                                        onChange={(e) => {
                                            setViewMode(e.target.value)
                                            saveToStorage('userOrdersViewMode', e.target.value)
                                        }}
                                    />
                                    <ViewModuleIcon className="radio-icon" />
                                    <span>Cards</span>
                                </label>
                                <label className={`radio-option ${viewMode === 'list' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="viewMode"
                                        value="list"
                                        checked={viewMode === 'list'}
                                        onChange={(e) => {
                                            setViewMode(e.target.value)
                                            saveToStorage('userOrdersViewMode', e.target.value)
                                        }}
                                    />
                                    <ViewListIcon className="radio-icon" />
                                    <span>List</span>
                                </label>
                            </div>
                        </div>

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
            </section>

            {/* Orders List */}
            <section className="orders-list-section">
                {filteredOrders.length === 0 && !isLoading ? (
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
                ) : filteredOrders.length === 0 && isLoading ? (
                    <LoadingSpinner message="Loading orders..." size="medium" />
                ) : (
                    <div className={viewMode === 'cards' ? 'orders-grid' : 'orders-list'}>
                        {viewMode === 'cards' ? (
                            // Card View
                            filteredOrders.map(order => {
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
                                                to={`/order/${order._id}`} 
                                                className="btn btn-primary"
                                            >
                                                View Details
                                            </Link>
                                            <Link 
                                                to={`/gig/${order.gig?._id}`} 
                                                className="btn btn-outline"
                                            >
                                                View Gig
                                            </Link>
                                            <Link 
                                                to={`/user/${order.seller?._id}`} 
                                                className="btn btn-secondary"
                                            >
                                                Contact Seller
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            // List View using OrderList component
                            <OrderList 
                                orders={filteredOrders} 
                                viewType="buyer"
                                onSort={handleSort}
                                sortBy={sortBy}
                                sortOrder={sortOrder}
                            />
                        )}
                    </div>
                )}
            </section>
        </main>
    )
}
