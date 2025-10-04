import { httpService } from '../http.service'

export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg
}

async function query(filterBy = { txt: '' }) {
    return httpService.get(`gig/get-gigs`, filterBy)
}

function getById(gigId) {
    return httpService.get(`gig/get-gig/${gigId}`)
}

async function remove(gigId) {
    return httpService.delete(`gig/delete-gig/${gigId}`)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await httpService.put(`gig/update-gig/${gig._id}`, gig)
    } else {
        savedGig = await httpService.post('gig/add-gig', gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt })
    return savedMsg
}
