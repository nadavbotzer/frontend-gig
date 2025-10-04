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

// Add sample orders for testing when running locally
if (typeof window !== 'undefined' && window.localStorage) {
    // Check if we need to seed sample orders
    const existingOrders = localStorage.getItem('order')
        if (!existingOrders || JSON.parse(existingOrders).length === 0) {
            _createSampleOrders()
        }
}

async function _createSampleOrders() {
    const sampleOrders = [
        {
            _id: 'o1',
            buyer: 'u1', // String ID to match your data structure
            seller: { _id: 'u2', fullname: 'Jane Seller', imgUrl: '/images/profile-default.png', level: 2 },
            gig: { _id: 'g1', title: 'Sample Gig 1' },
            packageDeal: {
                title: 'Basic Logo Design',
                packageType: 'basic',
                total: 50,
                deliveryTime: 3
            },
            status: 'pending',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            msgs: []
        },
        {
            _id: 'o2',
            buyer: 'u1', // String ID to match your data structure
            seller: { _id: 'u3', fullname: 'Mike Designer', imgUrl: '/images/profile-default.png', level: 3 },
            gig: { _id: 'g2', title: 'Sample Gig 2' },
            packageDeal: {
                title: 'Premium Website Design',
                packageType: 'premium',
                total: 200,
                deliveryTime: 7
            },
            status: 'deliver',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
            msgs: []
        },
        {
            _id: 'o3',
            buyer: 'u2', // String ID to match your data structure
            seller: { _id: 'u1', fullname: 'John Buyer', imgUrl: '/images/profile-default.png', level: 1 },
            gig: { _id: 'g3', title: 'Sample Gig 3' },
            packageDeal: {
                title: 'Standard Writing Service',
                packageType: 'standard',
                total: 75,
                deliveryTime: 2
            },
            status: 'completed',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
            msgs: []
        }
    ]
    
            try {
                await storageService.post('order', sampleOrders[0])
                await storageService.post('order', sampleOrders[1])
                await storageService.post('order', sampleOrders[2])
            } catch (error) {
                console.error('❌ Failed to create sample orders:', error)
            }
}

async function query(filterBy = getDefaultFilter()) {
    let orders = await storageService.query(STORAGE_KEY)
    const { owner, seller, buyer, sortBy, sortOrder, excludeCreated } = filterBy
    
    // Filter by seller (owner or seller field)
    if (owner && owner._id) {
        orders = orders.filter(order => {
            if (typeof order.seller === 'string') {
                return order.seller === owner._id
            } else if (order.seller && order.seller._id) {
                return order.seller._id === owner._id
            }
            return false
        })
    } else if (seller) {
        orders = orders.filter(order => {
            if (typeof order.seller === 'string') {
                return order.seller === seller
            } else if (order.seller && order.seller._id) {
                return order.seller._id === seller
            }
            return false
        })
    }
    
    // Filter by buyer
    if (buyer) {
        orders = orders.filter(order => {
            if (typeof order.buyer === 'string') {
                return order.buyer === buyer
            } else if (order.buyer && order.buyer._id) {
                return order.buyer._id === buyer
            }
            return false
        })
    }

    // Filter out created orders only if excludeCreated is true
    if (excludeCreated) {
        orders = orders.filter(order => order.status !== 'created')
    }

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