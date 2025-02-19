import { updateOrder } from '../store/actions/order.actions'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import useModal from "../customHooks/useModal"
import { useRef } from 'react';
import { DropDown } from "../cmps/DropDown"

export function OrderPreview({ order }) {
    const [isOpen, toggleModal] = useModal();
    const buttonRef = useRef()
    const { buyer, gig } = order
    async function onUpdateStatus(orderStatus) {
        const orderToSave = { ...order, status: orderStatus }
        try {
            const updatedOrder = await updateOrder(orderToSave)
        } catch (error) {

        }
    }
    return (
        <>
            <div className="cell buyer-info">
                <img src={buyer.imgUrl} style={{ height: '2rem', width: '2rem' }} />
                <span>{buyer.fullname}</span>
            </div>
            <div className="cell gig-title">{gig.title}</div>
            <div className="cell gig-price">${gig.price}</div>
            <div className="cell order-status">{order.status}</div>
            <div className="cell seller-actions">
                <div className="actions-wrapper">
                    <button ref={buttonRef} onClick={toggleModal} className="btn seller-actions-btn">ACTIONS <KeyboardArrowDownIcon /></button>
                    <DropDown className="seller-actions-dropdown" isOpen={isOpen} toggleModal={toggleModal} buttonRef={buttonRef}>
                        <DropDown.Content>
                            <button className="btn" onClick={() => {
                                onUpdateStatus('approved')
                                toggleModal()
                            }}>Approve</button>
                            <button className="btn" onClick={() => {
                                onUpdateStatus('rejected')
                                toggleModal()
                            }}>Reject</button>
                            <button className="btn" onClick={() => {
                                onUpdateStatus('done')
                                toggleModal()
                            }}>Deliver</button>
                        </DropDown.Content>
                    </DropDown>
                </div>
            </div>
        </>
    )
}