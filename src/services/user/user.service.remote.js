import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
	getLoggedinUser,
	saveLoggedinUser,
}

function getUsers() {
	return httpService.get(`user/get-users`)
}

async function getById(userId) {
	const user = await httpService.get(`user/get-user/${userId}`)
	return user
}

function remove(userId) {
	return httpService.delete(`user/delete-user/${userId}`)
}

async function update({ _id, score }) {
	const user = await httpService.put(`user/update-user/${_id}`, { _id, score })

	// When admin updates other user's details, do not update loggedinUser
	const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
	if (loggedinUser._id === user._id) saveLoggedinUser(user)

	return user
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred)
	if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
	if (!userCred.imgUrl || userCred.imgUrl === '') userCred.imgUrl = '/images/profile-default.png'
	if (!userCred.createdAt) userCred.createdAt = new Date()
	const user = await httpService.post('auth/signup', userCred)
	return saveLoggedinUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}