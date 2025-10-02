import { OrderPreview } from "./OrderPreview";

export function OrderList({ orders }) {
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
                    <div className="order-row" key={order._id}>
                        <OrderPreview order={order} />
                    </div>
                )}
            </div>
        </div>
    )
}