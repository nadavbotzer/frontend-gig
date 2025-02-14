import { useState } from 'react'

import '../../assets/styles/cmps/BuyingInfo.scss'

export function BuyingInfo({ gig }) {

    const btns = ['Basic', 'Standard', 'Premium']

    const [active, setActive] = useState('Basic')

    function onActive({ target }) {
        setActive(target.value)
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
                            type="button"
                            value={btn}
                            onClick={(event) => onActive(event)}
                        />
                    })
                }
            </div>

            <div className="buying-content">

                <div className="price-info">
                    <span className='price currency-symbol'>₪</span>
                    <span className='price'>{gig.price}</span>
                    <img className='info-icon' src={'/images/info-icon.png'} />
                </div>

                <div className="discount-info">
                    <span className='discount'>
                        Save up to 10% with
                        <span className='discount-subscribe'> Subscribe to save</span>
                    </span>
                    <img className='question-icon' src={'/images/question-icon.png'} />
                </div>

                <span className='service-desc'><span className='font-weight'>{active}</span> 3d model of one space (No Renderings)</span><br />

                <span className='delivery'>DELIVERY</span>
                <span> </span>
                <span className='revisions'>REVISION</span>

                <ul className='services-list'>
                    <li>SERVICE INCLUDES</li>
                    <li>SERVICE INCLUDES</li>
                    <li>SERVICE INCLUDES</li>
                    <li>SERVICE INCLUDES</li>
                    <li>SERVICE INCLUDES</li>
                    <li>SERVICE INCLUDES</li>
                    <li>SERVICE INCLUDES</li>
                </ul>
            </div>
        </div>
    </section>
}