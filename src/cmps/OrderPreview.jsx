import { updateOrder } from '../store/actions/order.actions'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import useModal from "../customHooks/useModal"
import { useState, useRef } from 'react'
import { DropDown } from "../cmps/DropDown"
import { useNavigate, Link } from 'react-router-dom'

// MUI Icons for actions
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import VisibilityIcon from '@mui/icons-material/Visibility'

export function OrderPreview({ order, viewType = 'seller' }) {
    const actions = ['approve', 'reject', 'deliver']
    const [isOpen, toggleModal] = useModal();
    const buttonRef = useRef()
    const navigate = useNavigate()
    const { buyer, seller, packageDeal, gig, status, createdAt } = order
    // Handle both packageDeal (frontend) and gig (backend) structures
    const orderPackage = packageDeal || gig
    

    async function onUpdateStatus(orderStatus) {
        const orderToSave = { ...order, status: orderStatus }
        try {
            const updatedOrder = await updateOrder(orderToSave)
        } catch (err) {
            console.log(err)
        }
    }

    function handleViewDetails() {
        navigate(`/order/${order._id}`)
    }

    // Helper functions
    const formatOrderId = (id) => {
        return id ? `#${id.slice(-6).toUpperCase()}` : '#N/A'
    }

    const formatOrderDate = (date) => {
        if (!date) return 'N/A'
        return new Date(date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        })
    }

    const calculateDueDate = () => {
        if (!createdAt) {
            return 'N/A'
        }
        
        if (!orderPackage) {
            return 'N/A'
        }
        
        // Check for deliveryTime or daysToMake field
        const deliveryTime = orderPackage.deliveryTime || orderPackage.daysToMake
        
        if (!deliveryTime) {
            return 'N/A'
        }
        
        const orderDate = new Date(createdAt)
        const deliveryDays = deliveryTime
        
        // Handle different deliveryTime formats
        let daysToAdd = deliveryDays
        if (typeof deliveryDays === 'object' && deliveryDays.value) {
            daysToAdd = deliveryDays.value
        } else if (typeof deliveryDays === 'string') {
            daysToAdd = parseInt(deliveryDays) || 0
        }
        
        const dueDate = new Date(orderDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000))
        
        return dueDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getDaysRemaining = () => {
        if (!createdAt || !orderPackage) return null
        
        // Check for deliveryTime or daysToMake field
        const deliveryTime = orderPackage.deliveryTime || orderPackage.daysToMake
        if (!deliveryTime) return null
        
        const orderDate = new Date(createdAt)
        const deliveryDays = deliveryTime
        
        // Handle different deliveryTime formats (same as calculateDueDate)
        let daysToAdd = deliveryDays
        if (typeof deliveryDays === 'object' && deliveryDays.value) {
            daysToAdd = deliveryDays.value
        } else if (typeof deliveryDays === 'string') {
            daysToAdd = parseInt(deliveryDays) || 0
        }
        
        const dueDate = new Date(orderDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000))
        const today = new Date()
        const diffTime = dueDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        return diffDays
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
            case 'created': return 'status-default'
            default: return 'status-default'
        }
    }
    const daysRemaining = getDaysRemaining()
    
    // Handle missing orderPackage gracefully
    if (!orderPackage) {
        return (
            <>
                <div className="cell order-id">
                    <span className="order-id-text">Missing Data</span>
                    <span className="order-date-text">N/A</span>
                </div>
                <div className="cell buyer-info">
                    <span>No Data</span>
                </div>
                <div className="cell gig-info">
                    <span>No Data</span>
                </div>
                <div className="cell total">
                    <span>$0</span>
                </div>
                <div className="cell due-date">
                    <span>N/A</span>
                </div>
                <div className="cell status">
                    <span className="status-badge status-default">{status}</span>
                </div>
                <div className="cell actions">
                    <span>No Actions</span>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="cell order-id">
                <span className="order-id-text">{formatOrderId(order._id)}</span>
                <span className="order-date-text">{formatOrderDate(order.createdAt)}</span>
            </div>
            {viewType === 'seller' ? (
                <div className="cell buyer-info">
                    <img src={buyer?.imgUrl} alt={buyer?.fullname} />
                    <div className="buyer-details">
                        <span className="buyer-name">{buyer?.fullname}</span>
                        <span className="buyer-username">@{buyer?.username || buyer?.fullname?.toLowerCase().replace(' ', '')}</span>
                    </div>
                </div>
            ) : (
                <div className="cell seller-info">
                    <img src={seller?.imgUrl} alt={seller?.fullname} />
                    <div className="seller-details">
                        <span className="seller-name">{seller?.fullname}</span>
                        <span className="seller-username">@{seller?.username || seller?.fullname?.toLowerCase().replace(' ', '')}</span>
                    </div>
                </div>
            )}
            <div className="cell gig-info">
                <div className="gig-details">
                    <span className="gig-title">{orderPackage.title}</span>
                    <span className="package-type">{orderPackage.packageType?.toUpperCase() || 'BASIC'}</span>
                </div>
            </div>
            <div className="cell total">
                <span className="price">${orderPackage.total || orderPackage.price || 0}</span>
            </div>
            <div className="cell due-date">
                <div className="date-info">
                    <span className="date">{calculateDueDate()}</span>
                    {daysRemaining !== null && (
                        <span className={`days-remaining ${daysRemaining <= 1 ? 'urgent' : daysRemaining <= 3 ? 'warning' : 'normal'}`}>
                            {daysRemaining > 0 ? `${daysRemaining} days left` : 
                             daysRemaining === 0 ? 'Due today' : 
                             `${Math.abs(daysRemaining)} days overdue`}
                        </span>
                    )}
                </div>
            </div>
            <div className="cell status">
                <span className={`status-badge ${getStatusClass(status)}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            </div>
            <div className="cell actions">
                {viewType === 'seller' ? (
                    <div className="actions-wrapper">
                        <button ref={buttonRef} onClick={(e) => {
                            e.stopPropagation()
                            toggleModal()
                        }} className={`btn seller-actions-btn ${order.status}`}>
                            Actions<KeyboardArrowDownIcon />
                        </button>
                        <DropDown className="seller-actions-dropdown" isOpen={isOpen} toggleModal={toggleModal} buttonRef={buttonRef}>
                            <DropDown.Content>
                                <button className="btn action-btn view-details" onClick={(e) => {
                                    e.stopPropagation()
                                    handleViewDetails()
                                    toggleModal()
                                }}>
                                    <VisibilityIcon /> View Details
                                </button>
                                <button className="btn action-btn approve" onClick={(e) => {
                                    e.stopPropagation()
                                    onUpdateStatus(actions[0])
                                    toggleModal()
                                }}>
                                    <CheckCircleIcon /> Approve
                                </button>
                                <button className="btn action-btn reject" onClick={(e) => {
                                    e.stopPropagation()
                                    onUpdateStatus(actions[1])
                                    toggleModal()
                                }}>
                                    <CancelIcon /> Reject
                                </button>
                                <button className="btn action-btn deliver" onClick={(e) => {
                                    e.stopPropagation()
                                    onUpdateStatus(actions[2])
                                    toggleModal()
                                }}>
                                    <LocalShippingIcon /> Deliver
                                </button>
                            </DropDown.Content>
                        </DropDown>
                    </div>
                ) : (
                    <div className="order-actions">
                        <Link 
                            to={`/user/${seller?._id}`} 
                            className="btn btn-secondary contact-seller-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Contact
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}