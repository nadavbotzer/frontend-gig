import { useLocation } from "react-router"
import { useNavigate } from 'react-router'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { useParams } from 'react-router'
import { updateOrder } from '../store/actions/order.actions'
import { orderService } from '../services/order'
import { useEffect, useState } from 'react'

// MUI Icons
import CreditCardIcon from '@mui/icons-material/CreditCard'
import LockIcon from '@mui/icons-material/Lock'
import SecurityIcon from '@mui/icons-material/Security'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PaymentIcon from '@mui/icons-material/Payment'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'


export function Checkout() {

    const location = useLocation()
    const packageDeal = location.state?.packageDeal
    const { vat, deliveryTime, imgUrl, packageType, price, revisions, serviceFee, services, title, total } = packageDeal
    const navigate = useNavigate()
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        orderId && loadOrder(orderId)
    }, [orderId])


    async function loadOrder(orderId) {
        try {
            const order = await orderService.getById(orderId)
            setOrder(order)
        } catch (err) {
            console.log("err: ", err);
            showErrorMsg('Could not find order in server')
        }
    }

    async function onSaveOrder() {
        if (!order) {
            showErrorMsg('No order found to process')
            return
        }

        try {
            // Update order status to pending/confirmed and add createdAt timestamp
            const orderToUpdate = { 
                ...order, 
                status: 'pending',
                createdAt: new Date().toISOString()
            }
            console.log('Processing order:', orderToUpdate)

            const updatedOrder = await updateOrder(orderToUpdate)
            showSuccessMsg(`Order created successfully!`)
            
            // Navigate to confirmation page with order ID
            navigate(`/gig/confirmationpage/${updatedOrder._id || order._id}`)

        } catch (err) {
            console.error('Error processing order:', err)
            showErrorMsg('Failed to process order. Please try again.')
        }
    }

    return (
        <main className='main-checkout main-container'>
            <div className='checkout-header'>
                <h1>Complete Your Order</h1>
                <p>Review your order details and complete the payment</p>
            </div>

            <section className='checkout'>
                <div className='main-content'>
                    <section className='billing-info'>
                        <div className='section-header'>
                            <PersonIcon className='section-icon' />
                            <h4>Billing Information</h4>
                        </div>
                        <div className='billing-content'>
                            <p>Your invoice will be issued according to the details listed here.</p>
                            <div className='buyer-info'>
                                <span className='label'>Buyer:</span>
                                <span className='value'>{order && order.buyer.fullname}</span>
                            </div>
                        </div>
                    </section>

                    <section className='payment-option'>
                        <div className='section-header'>
                            <PaymentIcon className='section-icon' />
                            <h4>Payment Method</h4>
                        </div>
                        <div className='payment-method'>
                            <CreditCardIcon className='payment-icon' />
                            <span>Credit & Debit Cards</span>
                            <CheckCircleIcon className='selected-icon' />
                        </div>
                    </section>

                    <section className='card-pay'>
                        <div className='section-header'>
                            <CreditCardIcon className='section-icon' />
                            <h4>Card Details</h4>
                        </div>
                        <form className='card-form'>
                            <div className='form-group'>
                                <label className='form-label'>Card Number</label>
                                <div className='cardnumber'>
                                    <LockIcon className='input-icon' />
                                    <input type='text' name="card-number" value="4580 1003 5455 9807" readOnly />
                                    <img className='img-card' src='https://thenorthface.co.il/wp-content/uploads/2023/02/payment-icon.png' alt='Card' />
                                </div>
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label className='form-label'>Expiration Date</label>
                                    <input type='text' name='cardnumber' value='02 / 30' readOnly />
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>Security Code</label>
                                    <input type='text' name='securityCode' value='344' readOnly />
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>Card Holder's Name</label>
                                <input type='text' name='cardname' placeholder='Full name as written on card' />
                            </div>

                            <div className='checkbox-group'>
                                <input className='saveCardCheckbox' type='checkbox' name='saveCardCheckbox' id='saveCardCheckbox' />
                                <label htmlFor='saveCardCheckbox'>Save this card for future payments</label>
                            </div>
                        </form>
                    </section>
                </div>
                <div className='side-content'>
                    <div className='order-summary'>
                        <h3>Order Summary</h3>
                        
                        <section className='order-details-container'>
                            <header className='order-details-header'>
                                <div className='gig-img'>
                                    <img src={imgUrl} alt={title} />
                                </div>
                                <div className='gig-info'>
                                    <h4 className='title'>{title}</h4>
                                    <div className='package-type'>{packageType.toUpperCase()}</div>
                                </div>
                            </header>
                            
                            <div className='services-section'>
                                <h5>Included Services</h5>
                                <ul className='services-list'>
                                    {services.map((service, index) => (
                                        <li key={index} className='service-item'>
                                            <CheckCircleIcon className='check-icon' />
                                            <span>{service}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        <section className='pricing-summary'>
                            <div className='pricing-item'>
                                <span className='label'>Service Fee</span>
                                <span className='value'>${parseInt(serviceFee)}</span>
                            </div>
                            <div className='pricing-item'>
                                <span className='label'>VAT</span>
                                <span className='value'>${parseInt(vat)}</span>
                            </div>
                            <div className='pricing-item total'>
                                <span className='label'>Total</span>
                                <span className='value'>${total}</span>
                            </div>
                        </section>

                        <section className='delivery-info'>
                            <LocalShippingIcon className='delivery-icon' />
                            <div className='delivery-details'>
                                <span className='label'>Delivery Time</span>
                                <span className='value'>{deliveryTime} Days</span>
                            </div>
                        </section>

                        <button onClick={onSaveOrder} className='confirm-btn'>
                            <PaymentIcon className='btn-icon' />
                            {order ? 'Confirm & Pay' : 'Loading...'}
                        </button>

                        <div className='security-info'>
                            <div className='secure-payment'>
                                <SecurityIcon className='security-icon' />
                                <span>SSL Secure Payment</span>
                            </div>
                            <div className='payment-message'>
                                <p>You will be charged <strong>${total}</strong>. Total amount includes currency conversion fees.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}