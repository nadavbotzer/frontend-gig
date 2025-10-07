export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const ADD_ORDER_MSG = 'ADD_ORDER_MSG'
export const CLEAR_ORDERS = 'CLEAR_ORDERS'

const initialState = {
    orders: [],
    pagination: null,
}

export function orderReducer(state = initialState, action) {
    var newState = state
    var orders
    switch (action.type) {
        case SET_ORDERS:
            newState = { 
                ...state, 
                orders: action.orders,
                pagination: action.pagination || state.pagination
            }
            break
        case SET_ORDER:
            newState = { ...state, order: action.order }
            break
        case REMOVE_ORDER:
            const lastRemovedOrder = state.orders.find(order => order._id === action.orderId)
            orders = state.orders.filter(order => order._id !== action.orderId)
            newState = { ...state, orders, lastRemovedOrder }
            break
        case ADD_ORDER:
            newState = { ...state, orders: [...state.orders, action.order] }
            break
        case UPDATE_ORDER:
            const updatedOrders = state.orders.map(order =>
                order._id === action.order._id ? { ...order, ...action.order } : order
            )
            // Also update the individual order if it matches
            const updatedOrder = state.order && state.order._id === action.order._id 
                ? { ...state.order, ...action.order } 
                : state.order
            newState = { ...state, orders: updatedOrders, order: updatedOrder }
            break
        case ADD_ORDER_MSG:
            newState = { ...state, order: { ...state.order, msgs: [...state.order.msgs || [], action.msg] } }
            break
        case CLEAR_ORDERS:
            newState = { ...state, orders: [] }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const order1 = { _id: 'b101', title: 'Order ' + parseInt(Math.random() * 10), msgs: [] }
    const order2 = { _id: 'b102', title: 'Order ' + parseInt(Math.random() * 10), msgs: [] }

    state = orderReducer(state, { type: SET_ORDERS, orders: [order1] })
    console.log('After SET_ORDERS:', state)

    state = orderReducer(state, { type: ADD_ORDER, order: order2 })
    console.log('After ADD_ORDER:', state)

    state = orderReducer(state, { type: UPDATE_ORDER, order: { ...order2, title: 'Good' } })
    console.log('After UPDATE_ORDER:', state)

    state = orderReducer(state, { type: REMOVE_ORDER, orderId: order2._id })
    console.log('After REMOVE_ORDER:', state)

    state = orderReducer(state, { type: REMOVE_ORDER, orderId: order1._id })
    console.log('After REMOVE_ORDER:', state)
}

