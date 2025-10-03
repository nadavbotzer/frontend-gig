import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadOrder, updateOrder } from '../store/actions/order.actions'
import { loadGig } from '../store/actions/gig.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { LoadingSpinner } from '../cmps/LoadingSpinner'

// MUI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonIcon from '@mui/icons-material/Person'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import DescriptionIcon from '@mui/icons-material/Description'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { Level } from '../cmps/Level'

export function OrderDetails() {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    const order = useSelector(storeState => storeState.orderModule.order)
    const gig = useSelector(storeState => storeState.gigModule.gig)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isEditingStatus, setIsEditingStatus] = useState(false)
    const [newStatus, setNewStatus] = useState('')
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        async function fetchOrderAndGig() {
            try {
                setIsLoading(true)
                setError(null)
                
                // Load the order
                await loadOrder(orderId)
                
            } catch (err) {
                console.error('Failed to load order:', err)
                setError('Order not found or failed to load')
                showErrorMsg('Failed to load order details')
                setIsLoading(false)
            }
        }

        if (orderId) {
            fetchOrderAndGig()
        }
    }, [orderId])

    // Load gig when order is loaded and has gig ID
    useEffect(() => {
        async function fetchGig() {
            if (order && order.packageDeal && order.packageDeal.gigId) {
                try {
                    await loadGig(order.packageDeal.gigId)
                } catch (err) {
                    console.error('Failed to load gig:', err)
                    showErrorMsg('Failed to load gig details')
                } finally {
                    setIsLoading(false)
                }
            } else if (order) {
                setIsLoading(false)
            }
        }

        fetchGig()
    }, [order])

    // Check if user has access to this order
    const hasAccess = () => {
        if (!user || !order) return false
        
        // Admin can see all orders
        if (user.isAdmin) return true
        
        // Buyer can see their own orders
        if (order.buyer && order.buyer._id === user._id) return true
        
        // Seller can see orders for their gigs
        if (order.seller && order.seller._id === user._id) return true
        
        return false
    }

    // Check if user can edit order status (seller or admin)
    const canEditStatus = () => {
        if (!user || !order) return false
        
        // Admin can edit all orders
        if (user.isAdmin) return true
        
        // Seller can edit their own orders
        if (order.seller && order.seller._id === user._id) return true
        
        return false
    }

    // Handle status change
    const handleStatusChange = async (status) => {
        if (!order || isUpdating) return
        
        setIsUpdating(true)
        try {
            const updatedOrder = { ...order, status }
            await updateOrder(updatedOrder)
            
            // Format status name for display
            const statusName = status.charAt(0).toUpperCase() + status.slice(1)
            showSuccessMsg(`Order status updated to "${statusName}"`)
            
            setIsEditingStatus(false)
            setNewStatus('')
        } catch (err) {
            console.error('Failed to update order status:', err)
            showErrorMsg('Failed to update order status')
        } finally {
            setIsUpdating(false)
        }
    }

    // Start editing status
    const startEditingStatus = () => {
        setNewStatus(order.status || 'pending')
        setIsEditingStatus(true)
    }

    // Cancel editing status
    const cancelEditingStatus = () => {
        setIsEditingStatus(false)
        setNewStatus('')
    }

    function formatDate(timestamp) {
        if (!timestamp) return new Date().toLocaleDateString()
        return new Date(timestamp).toLocaleDateString()
    }

    function getOrderStatusIcon(status) {
        switch (status) {
            case 'confirmed':
                return <CheckCircleIcon className="status-icon confirmed" />
            case 'pending':
                return <PendingIcon className="status-icon pending" />
            case 'cancelled':
                return <CancelIcon className="status-icon cancelled" />
            default:
                return <PendingIcon className="status-icon pending" />
        }
    }

    function getGigTitle() {
        if (gig && gig.title) return gig.title
        if (order && order.packageDeal && order.packageDeal.title) return order.packageDeal.title
        if (order && order.gig && order.gig.title) return order.gig.title
        if (order && order.title) return order.title
        return 'Service Order'
    }

    function getSellerName() {
        if (gig && gig.owner && gig.owner.fullname) return gig.owner.fullname
        if (order && order.seller && order.seller.fullname) return order.seller.fullname
        if (order && order.sellerName) return order.sellerName
        return 'Seller'
    }

    function getOrderPrice() {
        if (order && order.packageDeal && order.packageDeal.total) return order.packageDeal.total
        if (order && order.totalPrice) return order.totalPrice
        if (order && order.price) return order.price
        return 0
    }

    function getDeliveryTime() {
        if (order && order.packageDeal && order.packageDeal.deliveryTime) return `${order.packageDeal.deliveryTime} days`
        if (gig && gig.daysToMake) return `${gig.daysToMake} days`
        if (order && order.deliveryTime) return order.deliveryTime
        return 'Standard delivery'
    }

    function getGigImage() {
        if (gig && gig.imgUrls && gig.imgUrls.length > 0) return gig.imgUrls[0]
        if (order && order.packageDeal && order.packageDeal.imgUrl) return order.packageDeal.imgUrl
        return '/images/default-image.jpg'
    }

    function getPackageType() {
        if (order && order.packageDeal && order.packageDeal.packageType) {
            return order.packageDeal.packageType.toUpperCase()
        }
        return 'STANDARD'
    }

    if (isLoading) {
        return <LoadingSpinner message="Loading order details..." size="large" fullPage />
    }

    if (error || !order) {
        return (
            <div className="order-details-page error">
                <div className="error-content">
                    <h1>Order Not Found</h1>
                    <p>{error || "We couldn't find the order you're looking for."}</p>
                    <div className="error-actions">
                        <Link to="/orders" className="btn btn-primary">My Orders</Link>
                        <Link to="/gig" className="btn btn-secondary">Browse Gigs</Link>
                    </div>
                </div>
            </div>
        )
    }

    // Check access permissions
    if (!hasAccess()) {
        return (
            <div className="order-details-page access-denied">
                <div className="access-denied-content">
                    <h1>Access Denied</h1>
                    <p>You don't have permission to view this order. Only the buyer, seller, or admin can access order details.</p>
                    <div className="access-denied-actions">
                        <Link to="/orders" className="btn btn-primary">
                            <ArrowBackIcon className="btn-icon" />
                            My Orders
                        </Link>
                        <Link to="/gig" className="btn btn-secondary">Browse Gigs</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="order-details-page">
            <div className="order-details-container">
                {/* Header */}
                <div className="order-header">
                    <button 
                        className="back-button"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon className="back-icon" />
                        Back
                    </button>
                    <h1>Order Details</h1>
                </div>

                {/* Order Status */}
                <div className="order-status-section">
                    <div className="status-header">
                        {getOrderStatusIcon(order.status || 'pending')}
                        <h2>Order #{order._id}</h2>
                    </div>
                    <div className="status-controls">
                        {isEditingStatus ? (
                            <div className="status-edit-controls">
                                <select 
                                    value={newStatus} 
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="status-select"
                                    disabled={isUpdating}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                                <button 
                                    className="btn btn-save"
                                    onClick={() => handleStatusChange(newStatus)}
                                    disabled={isUpdating}
                                >
                                    <SaveIcon className="btn-icon" />
                                    {isUpdating ? 'Updating...' : 'Save'}
                                </button>
                                <button 
                                    className="btn btn-cancel"
                                    onClick={cancelEditingStatus}
                                    disabled={isUpdating}
                                >
                                    <CloseIcon className="btn-icon" />
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="status-display">
                                <span className={`status ${order.status || 'pending'}`}>
                                    {order.status || 'pending'}
                                </span>
                                {canEditStatus() && (
                                    <button 
                                        className="btn btn-edit"
                                        onClick={startEditingStatus}
                                    >
                                        <EditIcon className="btn-icon" />
                                        Edit Status
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Information */}
                <div className="order-info-section">
                    <h2>Order Information</h2>
                    <div className="order-card">
                        <div className="gig-header">
                            <img src={getGigImage()} alt="Gig" className="gig-image" />
                            <div className="gig-info">
                                <h3 className="gig-title">{getGigTitle()}</h3>
                                <div className="seller-info">
                                    <PersonIcon className="info-icon" />
                                    <span className="seller-name">by {getSellerName()}</span>
                                    <div className="seller-level">
                                        <Level level={order.seller?.level || 1} />
                                    </div>
                                </div>
                                <p className="package-type">{getPackageType()} Package</p>
                            </div>
                        </div>
                        
                        <div className="order-details-grid">
                            <div className="detail-item">
                                <AttachMoneyIcon className="detail-icon" />
                                <div className="detail-content">
                                    <span className="detail-label">Total Price</span>
                                    <span className="detail-value">${getOrderPrice()}</span>
                                </div>
                            </div>
                            
                            <div className="detail-item">
                                <DeliveryDiningIcon className="detail-icon" />
                                <div className="detail-content">
                                    <span className="detail-label">Delivery Time</span>
                                    <span className="detail-value">{getDeliveryTime()}</span>
                                </div>
                            </div>
                            
                            <div className="detail-item">
                                <CalendarTodayIcon className="detail-icon" />
                                <div className="detail-content">
                                    <span className="detail-label">Order Date</span>
                                    <span className="detail-value">{formatDate(order.createdAt)}</span>
                                </div>
                            </div>
                            
                            {order.buyer && (
                                <div className="detail-item">
                                    <PersonIcon className="detail-icon" />
                                    <div className="detail-content">
                                        <span className="detail-label">Buyer</span>
                                        <span className="detail-value">{order.buyer.fullname}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {order.description && (
                            <div className="order-description">
                                <DescriptionIcon className="description-icon" />
                                <div className="description-content">
                                    <h4>Order Description</h4>
                                    <p>{order.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Package Details */}
                {order.packageDeal && (
                    <div className="package-details-section">
                        <h2>Package Details</h2>
                        <div className="package-card">
                            <div className="package-header">
                                <h3>{getPackageType()} Package</h3>
                                <span className="package-price">${order.packageDeal.price}</span>
                            </div>
                            
                            {order.packageDeal.services && order.packageDeal.services.length > 0 && (
                                <div className="services-list">
                                    <h4>Included Services:</h4>
                                    <ul>
                                        {order.packageDeal.services.map((service, index) => (
                                            <li key={index}>{service}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            <div className="package-info">
                                <div className="package-item">
                                    <span className="package-label">Revisions:</span>
                                    <span className="package-value">{order.packageDeal.revisions || 'Unlimited'}</span>
                                </div>
                                <div className="package-item">
                                    <span className="package-label">Service Fee:</span>
                                    <span className="package-value">${order.packageDeal.serviceFee || 0}</span>
                                </div>
                                <div className="package-item">
                                    <span className="package-label">VAT:</span>
                                    <span className="package-value">${order.packageDeal.vat || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Status Actions */}
                {canEditStatus() && !isEditingStatus && (
                    <div className="quick-actions-section">
                        <h2>Quick Actions</h2>
                        <div className="quick-actions">
                            <button 
                                className="btn btn-approve"
                                onClick={() => handleStatusChange('approved')}
                                disabled={isUpdating || order.status === 'approved'}
                            >
                                <CheckCircleIcon className="btn-icon" />
                                Approve Order
                            </button>
                            <button 
                                className="btn btn-deliver"
                                onClick={() => handleStatusChange('delivered')}
                                disabled={isUpdating || order.status === 'delivered'}
                            >
                                <LocalShippingIcon className="btn-icon" />
                                Mark as Delivered
                            </button>
                            <button 
                                className="btn btn-reject"
                                onClick={() => handleStatusChange('rejected')}
                                disabled={isUpdating || order.status === 'rejected'}
                            >
                                <CancelIcon className="btn-icon" />
                                Reject Order
                            </button>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                    <Link to="/orders" className="btn btn-secondary">
                        <ArrowBackIcon className="btn-icon" />
                        My Orders
                    </Link>
                    {(gig && gig.owner) ? (
                        <Link to={`/user/${gig.owner._id}`} className="btn btn-outline">
                            <PersonIcon className="btn-icon" />
                            View Seller Profile
                        </Link>
                    ) : (order.seller && (
                        <Link to={`/user/${order.seller._id}`} className="btn btn-outline">
                            <PersonIcon className="btn-icon" />
                            View Seller Profile
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
