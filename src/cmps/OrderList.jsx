import { OrderPreview } from "./OrderPreview";
import { useNavigate } from 'react-router-dom';

export function OrderList({ orders }) {
    const navigate = useNavigate()

    function handleRowClick(orderId, event) {
        // Don't navigate if clicking on the actions dropdown
        if (event.target.closest('.actions-wrapper')) {
            return
        }
        navigate(`/order/${orderId}`)
    }

    return (
        <div className="order-list-container">
            <div className="order-list">
                <div className="order-row header-row">
                    <div className="cell header order-id">ORDER ID</div>
                    <div className="cell header buyer">BUYER</div>
                    <div className="cell header gig-info">GIG</div>
                    <div className="cell header total">TOTAL</div>
                    <div className="cell header due-date">DUE DATE</div>
                    <div className="cell header status">STATUS</div>
                    <div className="cell header actions">ACTIONS</div>
                </div>
                {orders.map(order =>
                    <div 
                        className="order-row clickable-row" 
                        key={order._id}
                        onClick={(e) => handleRowClick(order._id, e)}
                    >
                        <OrderPreview order={order} />
                    </div>
                )}
            </div>
        </div>
    )
}