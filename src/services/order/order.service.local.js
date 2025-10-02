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
    const { owner, buyer } = filterBy
    
    // Filter by seller (owner)
    if (owner && owner._id) {
        orders = orders.filter(order => order.seller && order.seller._id === owner._id)
    }
    
    // Filter by buyer
    if (buyer) {
        orders = orders.filter(order => order.buyer && order.buyer._id === buyer)
    }

    return orders = orders.filter(order => order.status !== 'created')
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