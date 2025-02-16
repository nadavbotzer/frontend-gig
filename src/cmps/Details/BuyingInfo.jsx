import { useState } from 'react'

import '../../assets/styles/cmps/BuyingInfo.scss'

export function BuyingInfo({ gig }) {

    const btns = ['Basic', 'Standard', 'Premium']

    const packegeDealList = [
        { text: '3D modeling', packages: ['Basic', 'Standard', 'Premium'] },
        { text: 'Environment', packages: ['Standard', 'Premium'] },
        { text: 'Furniture and people', packages: ['Standard', 'Premium'] },
        { text: 'Texturing & lighting', packages: ['Standard', 'Premium'] },
        { text: '4 renderings', packages: ['Basic', 'Standard', 'Premium'] },
        { text: 'Source file', packages: ['Basic', 'Standard', 'Premium'] },
    ]

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

                <div className="delivery-revisions">
                    <span className='delivery'>
                        <img src={'/images/clock-icon.png'} />
                        4-day delivery
                    </span>
                    <span className='revisions'>
                        <img src={'/images/recycle-icon.png'} />
                        1 Revision
                    </span>
                </div>

                <ul className='services-list'>
                    {
                        packegeDealList.map((deal) => {
                            const src = deal.packages.includes(active) ? 'dark-check-icon.png' : 'light-check-icon.png'
                            return <li key={deal.text}>
                                <img src={`/images/${src}`} />
                                {deal.text}
                            </li>
                        })
                    }
                </ul>

                <div className='btns'>
                    <button className="btn continue" type="button">
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