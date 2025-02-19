import { OrderPreview } from "./OrderPreview";

export function OrderList({ orders }) {
    orders = orders.filter(order => order.status !== 'created')
    return (
        <ul className="order-list">
            <li className="row">
                <div className="cell header">BUYER</div>
                <div className="cell header">GIG INFO</div>
                <div className="cell header">TOTAL</div>
                <div className="cell header">STATUS</div>
                <div className="cell header">ACTIONS</div>
            </li>
            {orders.map(order =>
                <li className="row" key={order._id}>
                    <OrderPreview order={order} />
                </li>)
            }
        </ul>
    )
}