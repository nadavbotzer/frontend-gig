/**
 * Client-side sorting utility for orders
 */

// Helper function to calculate due date
const getDueDate = (createdAt, deliveryTime) => {
    if (!createdAt || !deliveryTime) return new Date(0).getTime()
    
    const orderDate = new Date(createdAt)
    const dueDate = new Date(orderDate.getTime() + (deliveryTime * 24 * 60 * 60 * 1000))
    return dueDate.getTime()
}

// Helper function to get status priority order
const getStatusOrder = (status) => {
    const statusOrder = {
        'pending': 1,
        'approve': 2,
        'approved': 2,
        'deliver': 3,
        'delivered': 3,
        'reject': 4,
        'rejected': 4,
        'completed': 5,
        'cancelled': 6,
        'created': 0
    }
    return statusOrder[status] || 999
}

export const sortOrdersClientSide = (orders, sortBy, sortOrder) => {
    return [...orders].sort((a, b) => {
        let aValue, bValue

        switch (sortBy) {
            case 'price':
                aValue = a.packageDeal?.total || a.gig?.price || 0
                bValue = b.packageDeal?.total || b.gig?.price || 0
                break
            case 'dueDate':
                aValue = getDueDate(a.createdAt, a.packageDeal?.deliveryTime || a.gig?.deliveryTime)
                bValue = getDueDate(b.createdAt, b.packageDeal?.deliveryTime || b.gig?.deliveryTime)
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

/**
 * Handle sort field changes and return new sort state
 * @param {string} field - The field to sort by
 * @param {string} currentSortBy - Current sort field
 * @param {string} currentSortOrder - Current sort order ('asc' or 'desc')
 * @returns {Object} New sort state { sortBy, sortOrder }
 */
export const handleSortField = (field, currentSortBy, currentSortOrder) => {
    if (currentSortBy === field) {
        // Toggle sort order if same field
        return {
            sortBy: field,
            sortOrder: currentSortOrder === 'asc' ? 'desc' : 'asc'
        }
    } else {
        // Set new field and default to ascending
        return {
            sortBy: field,
            sortOrder: 'asc'
        }
    }
}
