import { storageService } from '../async-storage.service'
import { getDefaultFilter } from '../util.service'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove
}

window.cs = orderService

async function query(filterBy = getDefaultFilter()) {

    let orders = await storageService.query(STORAGE_KEY)
    const { txt, price, sortField, sortDir, tags, deliveryTime } = filterBy
    const minPrice = price.min
    const maxPrice = price.max

    if (tags && tags.length) {
        orders = orders.filter(order =>
            tags.some(tag => order.tags.some(orderTag => orderTag.toLowerCase().includes(tag.toLowerCase())))
        )
    }
    if (deliveryTime) {
        orders = orders.filter(order => order.daysToMake <= deliveryTime) // Filter orders by max delivery days
    }
    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        orders = orders.filter(order => regex.test(order.title) || regex.test(order.description))
    }
    if (minPrice) {
        orders = orders.filter(order => order.price >= minPrice)
    }
    if (maxPrice) {
        orders = orders.filter(order => order.price <= maxPrice)
    }
    if (sortField === 'title' || sortField === 'owner') {
        orders.sort((order1, order2) =>
            order1[sortField].localeCompare(order2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'price') {
        orders.sort((order1, order2) =>
            (order1[sortField] - order2[sortField]) * +sortDir)
    }
    return orders
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
