import { useLocation } from "react-router"
import { useNavigate } from 'react-router'
import { showSuccessMsg } from '../services/event-bus.service'
import { useParams } from 'react-router'
import { updateOrder } from '../store/actions/order.actions'
import { useEffect, useState } from 'react'


export function Checkout() {

    const location = useLocation()
    const packageDeal = location.state?.packageDeal
    const { VAT, deliveryTime, imgUrl, packageType, price, revisions, serviceFee, services, title } = packageDeal
    const navigate = useNavigate()
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        try {
            loadOrder(orderId)

        } catch (err) {
            console.log(err)
        }
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
        const miniGig = {
            price: price + serviceFee + VAT,
            imgUrl,
            title,
            deliveryTime

        }
        order.gig = miniGig
        order.status = 'pending'
        try {
            const updatedOrder = await updateOrder(order)
            showSuccessMsg(`Order sent successfully`)
            navigate('/')

        } catch (err) {
            showSuccessMsg(`cannot send order`)

        }

    }

    return (
        <main className='main-checkout main-container'>
            <section className='checkout'>

                <div className='main-content'>
                    <section className='billing-info'>
                        <h4>Billing information</h4>
                        <p>Your invoice will be issued according to the details listed here.</p>
                        <p>{order && order.buyer.fullname}</p>
                    </section>
                    <section className='payment-option'>
                        <h4>Payment Options</h4>
                        <div className='payment-method'>
                            <span></span> Credit & Debit Cards
                        </div>
                    </section>
                    <section className='card-pay'>
                        <form action='#'>
                            <h2>Card Number</h2>
                            <div className='cardnumber'>
                                <img className='img-card' src='https://thenorthface.co.il/wp-content/uploads/2023/02/payment-icon.png'></img>
                                <input type='text' name="card-number" value="4580 1003 5455 9807" readOnly >
                                </input>
                                <img className='img-lock' src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNCAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSA3QzEyLjkwNjIgNyAxMy4yNSA3LjE1NjI1IDEzLjU2MjUgNy40Mzc1QzEzLjg0MzggNy43NSAxNCA4LjA5Mzc1IDE0IDguNVYxNC41QzE0IDE0LjkzNzUgMTMuODQzOCAxNS4yODEyIDEzLjU2MjUgMTUuNTYyNUMxMy4yNSAxNS44NzUgMTIuOTA2MiAxNiAxMi41IDE2SDEuNUMxLjA2MjUgMTYgMC43MTg3NSAxNS44NzUgMC40Mzc1IDE1LjU2MjVDMC4xMjUgMTUuMjgxMiAwIDE0LjkzNzUgMCAxNC41VjguNUMwIDguMDkzNzUgMC4xMjUgNy43NSAwLjQzNzUgNy40Mzc1QzAuNzE4NzUgNy4xNTYyNSAxLjA2MjUgNyAxLjUgN0gyLjI1VjQuNzVDMi4yNSAzLjkwNjI1IDIuNDM3NSAzLjEyNSAyLjg3NSAyLjM3NUMzLjMxMjUgMS42NTYyNSAzLjg3NSAxLjA5Mzc1IDQuNjI1IDAuNjU2MjVDNS4zNDM3NSAwLjIxODc1IDYuMTI1IDAgNyAwQzcuODQzNzUgMCA4LjYyNSAwLjIxODc1IDkuMzc1IDAuNjU2MjVDMTAuMDkzOCAxLjA5Mzc1IDEwLjY1NjIgMS42NTYyNSAxMS4wOTM4IDIuMzc1QzExLjUzMTIgMy4xMjUgMTEuNzUgMy45MDYyNSAxMS43NSA0Ljc1VjdIMTIuNVpNOC4yNSAxMi4yNVYxMC43NUM4LjI1IDEwLjQwNjIgOC4xMjUgMTAuMTI1IDcuODc1IDkuODc1QzcuNjI1IDkuNjI1IDcuMzQzNzUgOS41IDcgOS41QzYuNjI1IDkuNSA2LjM0Mzc1IDkuNjI1IDYuMDkzNzUgOS44NzVDNS44NDM3NSAxMC4xMjUgNS43NSAxMC40MDYyIDUuNzUgMTAuNzVWMTIuMjVDNS43NSAxMi42MjUgNS44NDM3NSAxMi45MDYyIDYuMDkzNzUgMTMuMTU2MkM2LjM0Mzc1IDEzLjQwNjIgNi42MjUgMTMuNSA3IDEzLjVDNy4zNDM3NSAxMy41IDcuNjI1IDEzLjQwNjIgNy44NzUgMTMuMTU2MkM4LjEyNSAxMi45MDYyIDguMjUgMTIuNjI1IDguMjUgMTIuMjVaTTkuMjUgN1Y0Ljc1QzkuMjUgNC4xMjUgOS4wMzEyNSAzLjU5Mzc1IDguNTkzNzUgMy4xNTYyNUM4LjE1NjI1IDIuNzE4NzUgNy42MjUgMi41IDcgMi41QzYuMzc1IDIuNSA1Ljg0Mzc1IDIuNzE4NzUgNS40MDYyNSAzLjE1NjI1QzQuOTY4NzUgMy41OTM3NSA0Ljc1IDQuMTI1IDQuNzUgNC43NVY3SDkuMjVaIi8+PC9zdmc+' />
                            </div>
                            <div className='center'>
                                <article>
                                    <h2>Expiration Date</h2>
                                    <input type='text' name='cardnumber' value='02 / 30' readOnly />
                                </article>
                                <article>
                                    <h2>Security Code</h2>
                                    <input type='text' name='securityCode' value='344' readOnly />
                                </article>
                            </div>
                            <article className='card-holder-name'>
                                <h2>Card holder's name</h2>
                                <div className='input-holders-name'>
                                    <input type='text' name='cardname' placeholder='full name' />
                                    <h2>As written on card</h2>
                                </div>
                            </article>
                            <div>
                                <input className='saveCardCheckbox' type='checkbox' name='saveCardCheckbox' />
                                <label htmlFor='saveCardCheckbox'>Save this card for future payments</label>
                            </div>
                        </form>
                    </section>
                </div>
                <div className='side-content'>
                    <section className='order-details-container'>
                        <header className='order-details-header space-between'>
                            <span className='gig-img'>
                                <img src={imgUrl} />
                            </span>
                            <div className='title'>{title}</div>
                        </header>
                        <div className='order-details-general-pricing space-between'>
                            <p>{packageType.toUpperCase()}</p>
                            <p><span>$</span>{price}</p>
                        </div>
                        <ul className='features-list'>
                            {services.map(((service, idx) => {
                                return (
                                    <li key={idx}>{service}</li>
                                )
                            }))}
                        </ul>
                    </section>
                    <section className='summary'>
                        <div className='service space-between'>
                            <p>Service fee</p>
                            <p><span>$</span>{serviceFee}</p>
                        </div>
                        <div className='vat space-between'>
                            <p>VAT</p>
                            <p><span>$</span>{parseInt(VAT)}</p>
                        </div>
                        <div className='total space-between'>
                            <p>Total</p>
                            <p><span>$</span>{price + serviceFee + VAT}</p>
                        </div>
                        <div className='delivery space-between'>
                            <p>Total delivery time</p>
                            <p>{deliveryTime} Days</p>
                        </div>
                        <button onClick={onSaveOrder} className='confirm-btn'>Confirm & Pay</button>
                        <div className='secure-payment'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5 7C12.9062 7 13.25 7.15625 13.5625 7.4375C13.8438 7.75 14 8.09375 14 8.5V14.5C14 14.9375 13.8438 15.2812 13.5625 15.5625C13.25 15.875 12.9062 16 12.5 16H1.5C1.0625 16 0.71875 15.875 0.4375 15.5625C0.125 15.2812 0 14.9375 0 14.5V8.5C0 8.09375 0.125 7.75 0.4375 7.4375C0.71875 7.15625 1.0625 7 1.5 7H2.25V4.75C2.25 3.90625 2.4375 3.125 2.875 2.375C3.3125 1.65625 3.875 1.09375 4.625 0.65625C5.34375 0.21875 6.125 0 7 0C7.84375 0 8.625 0.21875 9.375 0.65625C10.0938 1.09375 10.6562 1.65625 11.0938 2.375C11.5312 3.125 11.75 3.90625 11.75 4.75V7H12.5ZM8.25 12.25V10.75C8.25 10.4062 8.125 10.125 7.875 9.875C7.625 9.625 7.34375 9.5 7 9.5C6.625 9.5 6.34375 9.625 6.09375 9.875C5.84375 10.125 5.75 10.4062 5.75 10.75V12.25C5.75 12.625 5.84375 12.9062 6.09375 13.1562C6.34375 13.4062 6.625 13.5 7 13.5C7.34375 13.5 7.625 13.4062 7.875 13.1562C8.125 12.9062 8.25 12.625 8.25 12.25ZM9.25 7V4.75C9.25 4.125 9.03125 3.59375 8.59375 3.15625C8.15625 2.71875 7.625 2.5 7 2.5C6.375 2.5 5.84375 2.71875 5.40625 3.15625C4.96875 3.59375 4.75 4.125 4.75 4.75V7H9.25Z"></path>
                                </svg>
                            </span>
                            <p>SSL Secure Payment</p>
                        </div>
                        <div className='message'>
                            <p>You will be charged <span>price</span>. Total amount
                                includes currency conversion fees.                        </p>
                        </div>
                    </section>
                </div>
            </section>

        </main>
    )
}