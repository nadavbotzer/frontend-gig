import { storageService } from '../async-storage.service'
import { getDefaultFilter } from '../util.service'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    updateOrder,
    saveOrder
}

window.cs = orderService

async function query(filterBy = getDefaultFilter()) {
    let orders = await storageService.query(STORAGE_KEY)
    const { owner, buyer, sortBy, sortOrder } = filterBy
    
    // Filter by seller (owner)
    if (owner && owner._id) {
        orders = orders.filter(order => order.seller && order.seller._id === owner._id)
    }
    
    // Filter by buyer
    if (buyer) {
        orders = orders.filter(order => order.buyer && order.buyer._id === buyer)
    }

    // Filter out created orders
    orders = orders.filter(order => order.status !== 'created')

    // Apply sorting
    if (sortBy) {
        orders = sortOrders(orders, sortBy, sortOrder || 'asc')
    }

    return orders
}

function sortOrders(orders, sortBy, sortOrder) {
    return orders.sort((a, b) => {
        let aValue, bValue

        switch (sortBy) {
            case 'dueDate':
                aValue = getDueDate(a)
                bValue = getDueDate(b)
                break
            case 'price':
                aValue = a.packageDeal?.total || 0
                bValue = b.packageDeal?.total || 0
                break
            case 'status':
                aValue = getStatusOrder(a.status)
                bValue = getStatusOrder(b.status)
                break
            default:
                return 0
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
        return 0
    })
}

function getDueDate(order) {
    if (!order.createdAt || !order.packageDeal?.deliveryTime) {
        return new Date(0) // Very old date for orders without due date
    }
    
    const orderDate = new Date(order.createdAt)
    const deliveryDays = order.packageDeal.deliveryTime
    return new Date(orderDate.getTime() + (deliveryDays * 24 * 60 * 60 * 1000))
}

function getStatusOrder(status) {
    // Define status priority order (lower number = higher priority)
    const statusOrder = {
        'pending': 1,
        'approve': 2,
        'approved': 2,
        'deliver': 3,
        'delivered': 3,
        'completed': 4,
        'reject': 5,
        'rejected': 5,
        'cancelled': 6,
        'created': 7
    }
    
    return statusOrder[status] || 999 // Unknown statuses go to the end
}


function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    let savedOrder;

    if (order._id) {
        // Update existing order
        const orderToSave = {
            ...order, // Keep all properties to avoid data loss
            _id: order._id,
        };
        savedOrder = await storageService.put(STORAGE_KEY, orderToSave);
    } else {
        savedOrder = await storageService.post(STORAGE_KEY, order);
    }

    return savedOrder
}

async function updateOrder(order) {
    const orderToSave = {
        ...order,
        _id: order._id,
    };
    return await storageService.put(STORAGE_KEY, orderToSave)
}

async function saveOrder(order) {
    return await storageService.post(STORAGE_KEY, order)
}