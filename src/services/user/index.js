const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, getRandomLanguages, getRandomLocation } from '../util.service'
import { userService as local } from './user.service.local'
import { userService as remote } from './user.service.remote'

function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullname: '',
        isAdmin: false, //* isSeller
        createdAt: null,
        imgUrl: '',
        level: getRandomIntInclusive(1, 3),
        rate: 2,
        location: getRandomLocation(),
        languages: getRandomLanguages(getRandomIntInclusive(1, 5)),
        proffession: 'Proffessional wiz when it comes to creativivty and ability'
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const userService = { ...service, getEmptyUser }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.userService = userService