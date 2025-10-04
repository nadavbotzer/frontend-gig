import { httpService } from '../http.service'

export const orderService = {
    query,
    getById,
    save,
    remove,
    addOrderMsg,
    updateOrder,
    saveOrder
}

async function query(filterBy) {
    console.log('🔍 Remote query called with filter:', filterBy)
    const result = await httpService.get(`order/get-orders`, filterBy)
    console.log('🔍 Remote query result:', result)
    console.log('🔍 Remote query result length:', result.length)
    return result
}

function getById(orderId) {
    return httpService.get(`order/get-order/${orderId}`)
}

async function remove(orderId) {
    return httpService.delete(`order/delete-order/${orderId}`)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`order/update-order/${order._id}`, order)
    } else {
        savedOrder = await httpService.post('order/add-order', order)
    }
    return savedOrder
}

async function updateOrder(order) {
    const orderToSave = {
        ...order,
        _id: order._id,
    };
    return await httpService.put(`order/update-order/${order._id}`, orderToSave)
}

async function saveOrder(order) {
    console.log('🔍 Remote saveOrder called with:', order)
    const result = await httpService.post('order/add-order', order)
    console.log('🔍 Remote saveOrder response:', result)
    return result
}

async function addOrderMsg(orderId, txt) {
    const savedMsg = await httpService.post(`order/${orderId}/msg`, { txt })
    return savedMsg
}