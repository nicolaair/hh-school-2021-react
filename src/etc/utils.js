export const debounce = (callback, wait) => {
    let timeoutId

    return (...args) => {
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => callback.apply(null, args), wait)
    }
}

export const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
