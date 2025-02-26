import { updateOrder } from '../store/actions/order.actions'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import useModal from "../customHooks/useModal"
import { useState, useRef } from 'react'
import { DropDown } from "../cmps/DropDown"

export function OrderPreview({ order }) {
    const actions = ['approve', 'reject', 'deliver']
    // const [actionStatus, setActionStatus] = useState(order.status)
    const [isOpen, toggleModal] = useModal();
    const buttonRef = useRef()
    const { buyer, packageDeal, status } = order

    async function onUpdateStatus(orderStatus) {
        // setActionStatus(orderStatus)
        const orderToSave = { ...order, status: orderStatus }
        try {
            const updatedOrder = await updateOrder(orderToSave)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        packageDeal &&
        <>
            <div className="cell buyer-info">
                <img src={buyer.imgUrl} />
                <span>{buyer.fullname}</span>
            </div>
            {/* <div className="cell gig-title">{packageDeal.title}</div> */}
            <div className="cell gig-price">${packageDeal.total}</div>
            {/* <div className="cell order-status">{status}</div> */}
            <div className="cell seller-actions">
                <div className="actions-wrapper">
                    <button ref={buttonRef} onClick={toggleModal} className={`btn seller-actions-btn ${order.status}`} >ACTIONS<KeyboardArrowDownIcon /></button>
                    <DropDown className="seller-actions-dropdown" isOpen={isOpen} toggleModal={toggleModal} buttonRef={buttonRef}>
                        <DropDown.Content>
                            <button className="btn" onClick={() => {
                                onUpdateStatus(actions[0])
                                toggleModal()
                            }}>Approve</button>
                            <button className="btn" onClick={() => {
                                onUpdateStatus(actions[1])
                                toggleModal()
                            }}>Reject</button>
                            <button className="btn" onClick={() => {
                                onUpdateStatus(actions[2])
                                toggleModal()
                            }}>Deliver</button>
                        </DropDown.Content>
                    </DropDown>
                </div>
            </div>
        </>
    )
}