import { OrderPreview } from "./OrderPreview";
import { Pagination } from "./Pagination";
import { useNavigate } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export function OrderList({ orders, onSort, sortBy, sortOrder, viewType = 'seller', pagination, onPageChange }) {
    const navigate = useNavigate()

    function handleRowClick(orderId, event) {
        // Don't navigate if clicking on the actions dropdown
        if (event.target.closest('.actions-wrapper')) {
            return
        }
        navigate(`/order/${orderId}`)
    }

    function handleHeaderClick(field) {
        if (onSort) {
            onSort(field)
        }
    }

    function getSortIcon(field) {
        if (sortBy !== field) return null
        return sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
    }

    return (
        <div className="order-list-container">
            <div className="order-list">
                <div className="order-row header-row">
                    <div className="cell header order-id">ORDER ID</div>
                    {viewType === 'seller' && <div className="cell header buyer">BUYER</div>}
                    {viewType === 'buyer' && <div className="cell header seller-info">SELLER</div>}
                    <div className="cell header gig-info">GIG</div>
                    <div 
                        className="cell header total sortable" 
                        onClick={() => handleHeaderClick('price')}
                    >
                        <span>TOTAL {getSortIcon('price')}</span>
                        
                    </div>
                    <div 
                        className="cell header due-date sortable" 
                        onClick={() => handleHeaderClick('dueDate')}
                    >
                        <span>DUE DATE {getSortIcon('dueDate')}</span>
                        
                    </div>
                    <div 
                        className="cell header status sortable" 
                        onClick={() => handleHeaderClick('status')}
                    >
                        <span>STATUS {getSortIcon('status')}</span>
                    </div>
                    <div className="cell header actions">ACTIONS</div>
                </div>
                {orders.map(order =>
                    <div 
                        className="order-row clickable-row" 
                        key={order._id}
                        onClick={(e) => handleRowClick(order._id, e)}
                    >
                        <OrderPreview order={order} viewType={viewType} />
                    </div>
                )}
            </div>
            
            {pagination && pagination.pages > 1 && (
                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    )
}