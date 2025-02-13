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
    return Math.random() > 0.5 ? 'basic' : 'premium';
}

export function getRandomLocation() {
    const locations = ['USA', 'UK', 'Canada', 'Germany', 'India', 'Ghana', 'France'];
    return locations[getRandomIntInclusive(0, locations.length - 1)];
}

export function getRandomTags() {
    const tags = [
        'Graphic Design',
        'Logo Design',
        'Web Development',
        'Content Writing',
        'Video Editing',
    ];
    return tags.sort(() => 0.5 - Math.random()).slice(0, 2);
}