import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { orderService } from '../../services/order'
import { addOrder } from '../../store/actions/order.actions'

export function BuyingInfo({ gig }) {

    const btns = ['basic', 'standard', 'premium']

    const [active, setActive] = useState(btns[0])

    const navigate = useNavigate()

    function onActive({ target }) {
        setActive(target.name)
    }

    async function checkout() {
        const price = gig.packagesList[active].price;
        const packageDeal = {
            gigId: gig._id,
            imgUrl: gig.imgUrls[0],
            title: gig.title,
            packageType: active.substring(0, 1).toLocaleUpperCase() + active.substring(1, active.length),
            price: price,
            services: gig.packagesList[active].servicesList.filter((service) => service.included).map((service) => service.text),
            deliveryTime: gig.packagesList[active].daysToMake,
            revisions: gig.packagesList[active].revisions,
            serviceFee: price * 0.1,
            VAT: price * 0.15
        }
        const order = orderService.getEmptyOrder()
        order.seller = gig.owner
        try {
            const updatedOrder = await addOrder(order)
            navigate(`/gig/checkout/${updatedOrder._id}`, { state: { packageDeal } })
        } catch (err) {
            console.log(err)
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
                    <span className='price'>{gig.packagesList[active].price}</span>
                    <img className='info-icon' src={'/images/info-icon.png'} />
                </div>

                <div className="discount-info">
                    <span className='discount'>
                        Save up to 10% with
                        <span className='discount-subscribe'> Subscribe to save</span>
                    </span>
                    <img className='question-icon' src={'/images/question-icon.png'} />
                </div>

                <span className='service-desc'><span className='font-weight'>{active.substring(0, 1).toLocaleUpperCase() + active.substring(1, active.length)}</span> {gig.packagesList[active].packageDescription}</span><br />

                <div className="delivery-revisions">
                    <span className='delivery'>
                        <img src={'/images/clock-icon.png'} />
                        {gig.packagesList[active].daysToMake}-day delivery
                    </span>
                    <span className='revisions'>
                        <img src={'/images/recycle-icon.png'} />
                        {gig.packagesList[active].revisions} Revision
                    </span>
                </div>

                <ul className='services-list'>
                    {
                        gig.packagesList[active].servicesList.map((service) => {
                            const src = service.included ? 'dark-check-icon.png' : 'light-check-icon.png'
                            return <li key={service.text}>
                                <img src={`/images/${src}`} />
                                {service.text}
                            </li>
                        })
                    }
                </ul>

                <div className='btns'>
                    <button to="checkout" className="btn continue" type="button" onClick={checkout}>
                        <span className='txt'>Continue</span>
                        <span className='icon'>
                            <img src={'/images/right-arrow-icon.png'} />
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