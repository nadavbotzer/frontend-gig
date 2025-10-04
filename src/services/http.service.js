import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

// Helper function to flatten nested objects for query parameters
function flattenObject(obj, prefix = '') {
    const flattened = {}
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key
            const value = obj[key]
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                // Recursively flatten nested objects
                Object.assign(flattened, flattenObject(value, newKey))
            } else if (Array.isArray(value)) {
                // Handle arrays - convert to comma-separated string or skip empty arrays
                if (value.length > 0) {
                    flattened[newKey] = value.join(',')
                }
            } else {
                // Handle primitive values - skip empty strings
                if (value !== '' && value !== null && value !== undefined) {
                    flattened[newKey] = value
                }
            }
        }
    }
    
    return flattened
}


const axios = Axios.create({ withCredentials: true })

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}${endpoint}`
    
    // Flatten nested objects for GET requests
    let params = null
    if (method === 'GET' && data) {
        params = flattenObject(data)
    }
    
    
    const options = { url, method, data, params }
    
    

    try {
        const res = await axios(options)
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        
        
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }
        throw err
    }
}