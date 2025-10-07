import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { orderService } from '../../services/order'
import { addOrder } from '../../store/actions/order.actions'
import { userService } from '../../services/user'
import { showErrorMsg } from '../../services/event-bus.service'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'


export function BuyingInfo({ gig }) {

    const btns = ['basic', 'standard', 'premium']
    const [active, setActive] = useState(btns[0])
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    
    // Ensure packagesList exists with fallback
    const packagesList = gig.packagesList || {
        basic: { 
            price: gig.price || 100, 
            daysToMake: gig.daysToMake || 7, 
            revisions: 1, 
            packageDescription: 'Basic package with essential services',
            servicesList: [
                { text: 'Basic service included', included: true },
                { text: 'Standard service', included: false },
                { text: 'Premium service', included: false }
            ]
        },
        standard: { 
            price: Math.ceil((gig.price || 100) * 1.1), 
            daysToMake: (gig.daysToMake || 7) + 2, 
            revisions: 2, 
            packageDescription: 'Standard package with more services',
            servicesList: [
                { text: 'Basic service included', included: true },
                { text: 'Standard service', included: true },
                { text: 'Premium service', included: false }
            ]
        },
        premium: { 
            price: Math.ceil((gig.price || 100) * 1.2), 
            daysToMake: (gig.daysToMake || 7) + 3, 
            revisions: 3, 
            packageDescription: 'Premium package with all services',
            servicesList: [
                { text: 'Basic service included', included: true },
                { text: 'Standard service', included: true },
                { text: 'Premium service', included: true }
            ]
        }
    }

    function onActive({ target }) {
        setActive(target.name)
    }

    async function checkout() {
        // Check if user is logged in
        if (!user) {
            showErrorMsg('Hey there! Please sign in to continue with your purchase')
            navigate('/login')
            return
        }

        // Calculate package deal details
        const price = packagesList[active].price;
        const vat = price * 0.15
        const serviceFee = price * 0.1
        const packageDeal = {
            gigId: gig._id,
            imgUrl: (gig.imgUrls && gig.imgUrls[0]) || '/images/default-image.jpg',
            title: gig.title,
            packageType: active.substring(0, 1).toLocaleUpperCase() + active.substring(1, active.length),
            price: price,
            services: packagesList[active].servicesList.filter((service) => service.included).map((service) => service.text),
            deliveryTime: packagesList[active].daysToMake,
            revisions: packagesList[active].revisions,
            serviceFee,
            vat,
            total: price + vat + serviceFee
        }

        // Create order with "created" status (draft order)
        const order = orderService.getEmptyOrder()
        order.packageDeal = packageDeal
        order.seller = gig.owner
        order.gig = gig
        order.status = 'created' // Draft status until payment is confirmed
        order.createdAt = new Date().toISOString()

        try {
            const createdOrder = await addOrder(order)
            
            // Navigate to checkout with order ID
            navigate(`/gig/checkout/${createdOrder._id}`)
        } catch (err) {
            console.error('Error creating draft order:', err)
            showErrorMsg('Failed to start checkout. Please try again.')
        }
    }

    return <section className="buying-info-column">
        <div className="info-box">
            <div className="box-navigation">
                {
                    btns.map((btn, index) => {
                        return <input
                            key={btn}
                            className={
                                `nav-btn 
                                ${active === btn ? 'active' : ''} 
                                ${index !== btns.length - 1 ? 'border-right' : ''}`
                            }
                            name={btn}
                            type="button"
                            value={btn.substring(0, 1).toLocaleUpperCase() + btn.substring(1, btn.length)}
                            onClick={(event) => onActive(event)}
                        />
                    })
                }
            </div>

            <div className="buying-content">

                <div className="price-info">
                    <span className='price currency-symbol'>$</span>
                    <span className='price'>{packagesList[active].price}</span>
                    <InfoOutlinedIcon className='info-icon' />
                </div>

                <div className="discount-info">
                    <span className='discount'>
                        Save up to 10% with
                        <span className='discount-subscribe'> Subscribe to save</span>
                    </span>
                    <HelpOutlineIcon className='question-icon' />
                </div>

                <span className='service-desc'><span className='font-weight'>{active.substring(0, 1).toLocaleUpperCase() + active.substring(1, active.length)}</span> {packagesList[active].packageDescription}</span><br />

                <div className="delivery-revisions">
                    <span className='delivery'>
                        <AccessTimeIcon />
                        {packagesList[active].daysToMake}-day delivery
                    </span>
                    <span className='revisions'>
                        <AutorenewIcon />
                        {packagesList[active].revisions} Revision
                    </span>
                </div>

                <ul className='services-list'>
                    {
                        packagesList[active].servicesList.map((service) => {
                            return <li key={service.text}>
                                {service.included ? (
                                    <CheckCircleIcon className='check-icon included' />
                                ) : (
                                    <RadioButtonUncheckedIcon className='check-icon' />
                                )}
                                {service.text}
                            </li>
                        })
                    }
                </ul>

                <div className='btns'>
                    <button to="checkout" className="btn continue" type="button" onClick={checkout}>
                        <span className='txt'>Continue</span>
                        <span className='icon'>
                            <ArrowForwardIcon />
                        </span>
                    </button>
                    <input className="btn compare" type="button" value="Compare packages" />
                </div>
            </div>
        </div>
        <div className="btn-container">
            <input className='contact' type="button" value="Contact me" />
        </div>
    </section>
}