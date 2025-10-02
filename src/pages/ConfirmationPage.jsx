import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadOrder } from '../store/actions/order.actions'
import { loadGig } from '../store/actions/gig.actions'
import { showErrorMsg } from '../services/event-bus.service'

export function ConfirmationPage() {
    const { orderid } = useParams()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    const order = useSelector(storeState => storeState.orderModule.order)
    const gig = useSelector(storeState => storeState.gigModule.gig)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchOrderAndGig() {
            try {
                setIsLoading(true)
                setError(null)
                
                // First load the order
                await loadOrder(orderid)
                
            } catch (err) {
                console.error('Failed to load order:', err)
                setError('Order not found or failed to load')
                showErrorMsg('Failed to load order details')
                setIsLoading(false)
            }
        }

        if (orderid) {
            fetchOrderAndGig()
        }
    }, [orderid])

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
                // Order loaded but no gig ID found
                setIsLoading(false)
            }
        }

        fetchGig()
    }, [order])

    function formatDate(timestamp) {
        if (!timestamp) return new Date().toLocaleDateString()
        return new Date(timestamp).toLocaleDateString()
    }

    function getOrderStatus(order) {
        if (!order) return 'unknown'
        return order.status || 'confirmed'
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
        return (
            <div className="confirmation-page loading">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading your order details...</p>
                </div>
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="confirmation-page error">
                <div className="error-content">
                    <h1>Order Not Found</h1>
                    <p>{error || "We couldn't find the order you're looking for."}</p>
                    <div className="error-actions">
                        <Link to="/gig" className="btn btn-primary">Browse Gigs</Link>
                        {user && <Link to="/dashboard" className="btn btn-secondary">View Dashboard</Link>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <div className="success-header">
                    <div className="success-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h1>Order Confirmed!</h1>
                    <p className="success-message">
                        Thank you for your purchase. Your order has been successfully placed and is being processed.
                    </p>
                </div>

                <div className="order-details">
                    <h2>Order Details</h2>
                    <div className="order-card">
                        <div className="order-header">
                            <span className="order-id">Order #{order._id}</span>
                            <span className={`order-status ${getOrderStatus(order)}`}>
                                {getOrderStatus(order)}
                            </span>
                        </div>
                        
                        <div className="order-content">
                            <div className="gig-header">
                                <img src={getGigImage()} alt="Gig" className="gig-image" />
                                <div className="gig-info">
                                    <h3 className="gig-title">{getGigTitle()}</h3>
                                    <p className="seller-name">by {getSellerName()}</p>
                                    <p className="package-type">{getPackageType()} Package</p>
                                </div>
                            </div>
                            
                            <div className="order-info">
                                <div className="info-item">
                                    <span className="label">Total Price:</span>
                                    <span className="value">${getOrderPrice()}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Delivery Time:</span>
                                    <span className="value">{getDeliveryTime()}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Order Date:</span>
                                    <span className="value">{formatDate(order.createdAt)}</span>
                                </div>
                                {order.buyer && (
                                    <div className="info-item">
                                        <span className="label">Buyer:</span>
                                        <span className="value">{order.buyer.fullname}</span>
                                    </div>
                                )}
                            </div>

                            {order.description && (
                                <div className="order-description">
                                    <h4>Order Description:</h4>
                                    <p>{order.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="next-steps">
                    <h2>What's Next?</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Seller Confirmation</h3>
                            <p>The seller will review your requirements and confirm the order details within 24 hours.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Work Begins</h3>
                            <p>Once confirmed, the seller will start working on your project according to your specifications.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Delivery & Review</h3>
                            <p>You'll receive the completed work within the agreed timeframe and can request revisions if needed.</p>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    {user && (
                        <Link to="/dashboard" className="btn btn-secondary">
                            View Dashboard
                        </Link>
                    )}
                    <Link to="/gig" className="btn btn-primary">
                        Browse More Gigs
                    </Link>
                    {(gig && gig.owner) ? (
                        <Link to={`/user/${gig.owner._id}`} className="btn btn-outline">
                            View Seller Profile
                        </Link>
                    ) : (order.seller && (
                        <Link to={`/user/${order.seller._id}`} className="btn btn-outline">
                            View Seller Profile
                        </Link>
                    ))}
                </div>

                <div className="support-info">
                    <p>Need help with your order? <Link to="/support">Contact Support</Link> or message the seller directly.</p>
                </div>
            </div>
        </div>
    )
}