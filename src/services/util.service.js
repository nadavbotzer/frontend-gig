export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function getRandomGigTitle() {
    const titles = [
        'design your logo',
        'create an eye-catching flyer',
        'build a responsive website',
        'edit your videos professionally',
        'write SEO-optimized blog posts',
    ];
    return titles[getRandomIntInclusive(0, titles.length - 1)];
}

export function getRandomName() {
    const names = ['Alex Doe', 'Jordan Smith', 'Chris Brown', 'Taylor Lee', 'Morgan White'];
    return names[getRandomIntInclusive(0, names.length - 1)];
}

export function getRandomLevel() {
    const levels = ['basic', 'standard', 'premium']
    const idx = getRandomIntInclusive(0, 2)
    return levels[idx];
}

export function getRandomLocation() {
    const locations = [
        { name: 'United States', format: 'us' },
        { name: 'UK', format: 'gb' },
        { name: 'Canada', format: 'ca' },
        { name: 'Germany', format: 'de' },
        { name: 'India', format: 'in' },
        { name: 'Ghana', format: 'gh' },
        { name: 'France', format: 'fr' }
    ]
    return locations[getRandomIntInclusive(0, locations.length - 1)];
}

export function getRandomTags() {
    const tags = ['logo-design',
        'wordpress',
        'voice-over',
        'artisitic',
        'proffesional',
        'accessible',
        'programming', 'tech',
        'graphics', 'design',
        'digital-marketing',
        'writing',
        'translation',
        'video',
        'animation',
        'ai-services',
        'music',
        'audio',
        'business',
        'consultin'
    ]
    return tags.sort(() => 0.5 - Math.random()).slice(0, 2);
}

export function getRandomCreatedAt() {
    const now = Date.now();
    const fiveYearsAgo = now - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years in milliseconds
    return Math.floor(Math.random() * (now - fiveYearsAgo) + fiveYearsAgo);
}

export function getRandomLanguages(count = 1) {
    const languages = [
        "English", "Spanish", "French", "German", "Chinese",
        "Japanese", "Russian", "Arabic", "Hindi", "Portuguese"
    ]
    const shuffled = languages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count)
}

export function timeAgo(timestamp) {
    const now = Date.now()
    const diffInSeconds = Math.floor((now - timestamp) / 1000)

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ]

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds)
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`
        }
    }

    return "Just now"
}

export function getDefaultFilter() {
    return {
        txt: '',
        price: {
            min: '',
            max: '',
        },
        sortField: '',
        sortDir: '',
        tags: [],
        deliveryTime: ''
    }
}

export function getRandomDuration() {

    const period = ['days', 'day', 'weeks', 'week', 'months', 'month', 'years', 'year']
    const idx = getRandomIntInclusive(0, 7)

    if (idx % 2 > 0) {
        return `1 ${period[idx]}`
    }

    switch (period[idx]) {
        case 'days': 
            return `${getRandomIntInclusive(1, 6)} ${period[idx]}`;
        case 'weeks': 
            return `${getRandomIntInclusive(1, 3)} ${period[idx]}`;
        case 'months': 
            return `${getRandomIntInclusive(1, 11)} ${period[idx]}`;
        case 'years': 
            return `${getRandomIntInclusive(1, 3)} ${period[idx]}`;
    }
}