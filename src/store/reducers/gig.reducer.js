export const SET_GIGS = 'SET_GIGS'
export const SET_GIG = 'SET_GIG'
export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const ADD_GIG_MSG = 'ADD_GIG_MSG'

const initialState = {
    gigs: [],
}

export function gigReducer(state = initialState, action) {
    var newState = state
    var gigs
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break
        case SET_GIG:
            newState = { ...state, gig: action.gig }
            break
        case REMOVE_GIG:
            const lastRemovedGig = state.gigs.find(gig => gig._id === action.gigId)
            gigs = state.gigs.filter(gig => gig._id !== action.gigId)
            newState = { ...state, gigs, lastRemovedGig }
            break
        case ADD_GIG:
            newState = { ...state, gigs: [...state.gigs, action.gig] }
            break
        case UPDATE_GIG:
            const updatedGigs = state.gigs.map(gig =>
                gig._id === action.gig._id ? { ...gig, ...action.gig } : gig
            )
            newState = { ...state, gigs: updatedGigs }
            break
        case ADD_GIG_MSG:
            newState = { ...state, gig: { ...state.gig, msgs: [...state.gig.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const gig1 = { _id: 'b101', title: 'Gig ' + parseInt(Math.random() * 10), msgs: [] }
    const gig2 = { _id: 'b102', title: 'Gig ' + parseInt(Math.random() * 10), msgs: [] }

    state = gigReducer(state, { type: SET_GIGS, gigs: [gig1] })
    console.log('After SET_GIGS:', state)

    state = gigReducer(state, { type: ADD_GIG, gig: gig2 })
    console.log('After ADD_GIG:', state)

    state = gigReducer(state, { type: UPDATE_GIG, gig: { ...gig2, title: 'Good' } })
    console.log('After UPDATE_GIG:', state)

    state = gigReducer(state, { type: REMOVE_GIG, gigId: gig2._id })
    console.log('After REMOVE_GIG:', state)

    state = gigReducer(state, { type: REMOVE_GIG, gigId: gig1._id })
    console.log('After REMOVE_GIG:', state)
}

